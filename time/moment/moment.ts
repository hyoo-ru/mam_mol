namespace $ {

	export type $mol_time_moment_config = number | Date | string | {
		year? : number
		month? : number
		day? : number
		hour? : number
		minute? : number
		second? : number
		offset? : $mol_time_duration_config
	}

	export class $mol_time_moment extends $mol_time_base {

		constructor( config : $mol_time_moment_config = new Date ) {
			
			super()

			if( typeof config === 'number' ) config = new Date( config )
			
			if( typeof config === 'string' ) {
				
				var parsed = /^(?:(\d\d\d\d)(?:-?(\d\d)(?:-?(\d\d))?)?)?(?:[T ](\d\d)(?::?(\d\d)(?::?(\d\d(?:\.\d\d\d)?))?)?(Z|[\+\-]\d\d(?::?(?:\d\d)?)?)?)?$/.exec( config )
				if( !parsed ) throw new Error( `Can not parse time moment (${ config })` )

				if( parsed[1] ) this.year = Number( parsed[1] )
				if( parsed[2] ) this.month = Number( parsed[2] ) - 1
				if( parsed[3] ) this.day =  Number( parsed[3] ) - 1
				if( parsed[4] ) this.hour = Number( parsed[4] )
				if( parsed[5] ) this.minute = Number( parsed[5] )
				if( parsed[6] ) this.second = Number( parsed[6] )
				if( parsed[7] ) this.offset = new $mol_time_duration( parsed[7] )
				
				return
			}
			
			if( config instanceof Date ) {
				
				this.year = config.getFullYear()
				this.month = config.getMonth()
				this.day = config.getDate() - 1
				this.hour = config.getHours()
				this.minute = config.getMinutes()
				this.second = config.getSeconds() + config.getMilliseconds() / 1000
				
				var offset = - config.getTimezoneOffset()
				this.offset = new $mol_time_duration({
					hour : ( offset < 0 ) ? Math.ceil( offset / 60 ) : Math.floor( offset / 60 ) ,
					minute : offset % 60
				})
				
				return
			}

			this.year = config.year
			this.month = config.month
			this.day = config.day
			this.hour = config.hour
			this.minute = config.minute
			this.second = config.second
			
			if( config.offset !== undefined ) this.offset = new $mol_time_duration( config.offset )
		}

		readonly year : number
		readonly month : number
		readonly day : number
		readonly hour : number
		readonly minute : number
		readonly second : number
		readonly offset : $mol_time_duration

		get weekday() {
			return ( this.native.getDay() + 6 ) % 7
		}

		private _native : Date
		get native() {
			if( this._native ) return this._native
			
			var utc = this.toOffset( 'Z' )
			return this._native = new Date( Date.UTC(
				( utc.year || 0 ) ,
				( utc.month || 0 ) ,
				( utc.day || 0 ) + 1,
				( utc.hour || 0 ) ,
				( utc.minute || 0 ) ,
				( utc.second && Math.floor( utc.second ) || 0 ) ,
				( utc.second && Math.floor( ( utc.second - Math.floor( utc.second ) ) * 1000 ) || 0 ) ,
			) )
		}

		private _normal : $mol_time_moment
		get normal() {
			if( this._normal ) return this._normal
			
			const moment = new $mol_time_moment( this.native )
			
			return this._normal = new $mol_time_moment({
				year : ( this.year === undefined ) ? undefined : moment.year ,
				month : ( this.month === undefined ) ? undefined : moment.month ,
				day : ( this.day === undefined ) ? undefined : moment.day ,
				hour : ( this.hour === undefined ) ? undefined : moment.hour ,
				minute : ( this.minute === undefined ) ? undefined : moment.minute ,
				second : ( this.second === undefined ) ? undefined : moment.second ,
				offset : ( this.offset === undefined ) ? undefined : moment.offset ,
			})
		}

		merge( config : $mol_time_moment_config ) {
			var moment = new $mol_time_moment( config )
			return new $mol_time_moment({
				year : ( moment.year === undefined ) ? this.year : moment.year ,
				month : ( moment.month === undefined ) ? this.month : moment.month ,
				day : ( moment.day === undefined ) ? this.day : moment.day ,
				hour : ( moment.hour === undefined ) ? this.hour : moment.hour ,
				minute : ( moment.minute === undefined ) ? this.minute : moment.minute ,
				second : ( moment.second === undefined ) ? this.second : moment.second ,
				offset : ( moment.offset === undefined ) ? this.offset : moment.offset ,
			})
		}

		shift( config : $mol_time_duration_config ) {
			var duration = new $mol_time_duration( config )
			var moment = new $mol_time_moment().merge( this )

			var second = ( moment.second + ( duration.second || 0 ) )
			var native = new Date(
				moment.year + ( duration.year || 0 ) ,
				moment.month + ( duration.month || 0 ) ,
				moment.day + 1 + ( duration.day || 0 ) ,
				moment.hour + ( duration.hour || 0 ) ,
				moment.minute + ( duration.minute || 0 ) ,
				Math.floor( second ) ,
				( second - Math.floor( second ) ) * 1000
			)

			if( isNaN( native.valueOf() ) ) throw new Error( 'Wrong time' )

			return new $mol_time_moment({
				year : ( this.year === undefined ) ? undefined : native.getFullYear(),
				month : ( this.month === undefined ) ? undefined : native.getMonth(),
				day : ( this.day === undefined ) ? undefined : native.getDate() - 1,
				hour : ( this.hour === undefined ) ? undefined : native.getHours(),
				minute : ( this.minute === undefined ) ? undefined : native.getMinutes(),
				second : ( this.second === undefined ) ? undefined : native.getSeconds() + native.getMilliseconds() / 1000,
				offset : this.offset,
			})
		}

		toOffset( config : $mol_time_duration_config ) {
			const duration = new $mol_time_duration( config )
			const offset = this.offset || new $mol_time_moment().offset
		 	const moment = this.shift( duration.summ( offset.mult( -1 ) ) )
			return moment.merge({ offset : duration })
		}

		valueOf() { return this.native.getTime() }

		toJSON() { return this.toString() }

		toString( pattern = 'YYYY-MM-DDThh:mm:ss.sssZ' ) {
			return super.toString( pattern )
		}

		/// Mnemonics:
		///  * single letter for numbers: M - month number, D - day of month.
		///  * uppercase letters for dates, lowercase for times: M - month number , m - minutes number
		///  * repeated letters for define register count: YYYY - full year, YY - shot year, MM - padded month number
		///  * words for word representation: Month - month name, WeekDay - day of week name
		///  * shortcuts: WD - short day of week, Mon - short month name.
		static patterns = {
			'YYYY' : ( moment : $mol_time_moment )=> {
				if( moment.year == null ) return ''
				return String( moment.year )
			} ,
			'AD' : ( moment : $mol_time_moment )=> {
				if( moment.year == null ) return ''
				return String( Math.floor( moment.year / 100 ) + 1 )
			} ,
			'YY' : ( moment : $mol_time_moment )=> {
				if( moment.year == null ) return ''
				return String( moment.year % 100 )
			} ,
			'Month' : ( moment : $mol_time_moment )=> {
				if( moment.month == null ) return ''
				return moment.native.toLocaleString( undefined , { month : 'long' } )
			} ,
			'DD Month' : ( moment : $mol_time_moment )=> {
				return moment.native.toLocaleString( undefined , { day : '2-digit' , month : 'long' } )
			} ,
			'D Month' : ( moment : $mol_time_moment )=> {
				return moment.native.toLocaleString( undefined , { day : 'numeric' , month : 'long' } )
			} ,
			'Mon' : ( moment : $mol_time_moment )=> {
				if( moment.month == null ) return ''
				return moment.native.toLocaleString( undefined , { month : 'short' } )
			} ,
			'DD Mon' : ( moment : $mol_time_moment )=> {
				return moment.native.toLocaleString( undefined , { day : '2-digit' , month : 'short' } )
			} ,
			'D Mon' : ( moment : $mol_time_moment )=> {
				return moment.native.toLocaleString( undefined , { day : 'numeric' , month : 'short' } )
			} ,
			'-MM' : ( moment : $mol_time_moment )=> {
				if( moment.month == null ) return ''
				return '-' + $mol_time_moment.patterns[ 'MM' ]( moment )
			} ,
			'MM' : ( moment : $mol_time_moment )=> {
				if( moment.month == null ) return ''
				var month = moment.month + 1
				return ( month < 10 )
					? ( '0' + month )
					: ( '' + month )
			} ,
			'M' : ( moment : $mol_time_moment )=> {
				if( moment.month == null ) return ''
				return String( moment.month + 1 )
			} ,
			'WeekDay' : ( moment : $mol_time_moment )=> {
				if( moment.weekday == null ) return ''
				return moment.native.toLocaleString( undefined , { weekday : 'long' } )
			} ,
			'WD' : ( moment : $mol_time_moment )=> {
				if( moment.weekday == null ) return ''
				return moment.native.toLocaleString( undefined , { weekday : 'short' } )
			} ,
			'-DD' : ( moment : $mol_time_moment )=> {
				if( moment.day == null ) return ''
				return '-' + $mol_time_moment.patterns[ 'DD' ]( moment )
			} ,
			'DD' : ( moment : $mol_time_moment )=> {
				if( moment.day == null ) return ''
				var day = moment.day + 1
				return ( day < 10 )
					? ( '0' + day )
					: String( day )
			} ,
			'D' : ( moment : $mol_time_moment )=> {
				if( moment.day == null ) return ''
				return String( moment.day + 1 )
			} ,
			'Thh' : ( moment : $mol_time_moment )=> {
				if( moment.hour == null ) return ''
				return 'T' + $mol_time_moment.patterns[ 'hh' ]( moment )
			} ,
			'hh' : ( moment : $mol_time_moment )=> {
				if( moment.hour == null ) return ''
				return ( moment.hour < 10 )
					? ( '0' + moment.hour )
					: String( moment.hour )
			} ,
			'h' : ( moment : $mol_time_moment )=> {
				if( moment.hour == null ) return ''
				return String( moment.hour )
			} ,
			':mm' : ( moment : $mol_time_moment )=> {
				if( moment.minute == null ) return ''
				return ':' + $mol_time_moment.patterns[ 'mm' ]( moment )
			} ,
			'mm' : ( moment : $mol_time_moment )=> {
				if( moment.minute == null ) return ''
				return ( moment.minute < 10 )
					? ( '0' + moment.minute )
					: String( moment.minute )
			} ,
			'm' : ( moment : $mol_time_moment )=> {
				if( moment.minute == null ) return ''
				return String( moment.minute )
			},
			':ss' : ( moment : $mol_time_moment )=> {
				if( moment.second == null ) return ''
				return ':' + $mol_time_moment.patterns[ 'ss' ]( moment )
			},
			'ss' : ( moment : $mol_time_moment )=> {
				if( moment.second == null ) return ''
				var second = Math.floor( moment.second )
				return ( second < 10 )
					? ( '0' + second )
					: String( second )
			},
			's' : ( moment : $mol_time_moment )=> {
				if( moment.second == null ) return ''
				return String( Math.floor( moment.second ) )
			} ,
			'.sss' : ( moment : $mol_time_moment )=> {
				if( moment.second == null ) return ''
				if( moment.second - Math.floor( moment.second ) === 0 ) return ''
				return '.' + $mol_time_moment.patterns[ 'sss' ]( moment )
			},
			'sss' : ( moment : $mol_time_moment )=> {
				if( moment.second == null ) return ''
				var millisecond = Math.floor( ( moment.second - Math.floor( moment.second ) ) * 1000 )
				return ( millisecond < 10 )
					? ( '00' + millisecond )
					: ( millisecond < 100 )
					? ( '0' + millisecond )
					: String( millisecond )
			},
			'Z' : ( moment : $mol_time_moment )=> {
				var offset = moment.offset
				if( !offset ) return ''

				return offset.toString( '+hh:mm' )
			}
		}

	}

}
