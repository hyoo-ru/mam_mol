namespace $ {

	export enum $mol_time_moment_weekdays {
		monday,
		tuesday,
		wednesday,
		thursday,
		friday,
		saturday,
		sunday
	}
	
	export type $mol_time_moment_config = number | Date | string | {
		year? : number
		month? : number
		day? : number
		hour? : number
		minute? : number
		second? : number
		offset? : $mol_time_duration_config
	}
	
	function numb( str: string, max: number ) {
		const numb = Number( str )
		if( numb < max ) return numb
		$mol_fail( new Error( `Wrong time component ${ str }` ) )
	}

	/**
	 * Small, simple, powerful, and fast TypeScript/JavaScript library for proper date/time/duration/interval arithmetic.
	 *
	 * Immutable iso8601 time moment representation.
	 * @see http://localhost:9080/mol/app/docs/-/test.html#!demo=mol_time_demo
	 */
	export class $mol_time_moment extends $mol_time_base {

		constructor( config : $mol_time_moment_config = new Date ) {
			
			super()

			if( typeof config === 'number' ) {
				config = new Date( config )
				if( Number.isNaN( config.valueOf() ) ) throw new RangeError( `Wrong ms count` )
			}
			
			if( typeof config === 'string' ) {
				
				const parsed = /^(?:(\d\d?\d?\d?)(?:-?(\d\d?)(?:-?(\d\d?))?)?)?(?:[T ](?:(\d\d?)(?::?(\d\d?)(?::?(\d\d?(?:\.\d+)?))?)?)?(Z|[\+\-]\d\d?(?::?(?:\d\d?)?)?)?)?$/.exec( config )
				if( !parsed ) throw new Error( `Can not parse time moment (${ config })` )

				if( parsed[1] ) this.year = numb( parsed[1], 9999 )
				if( parsed[2] ) this.month = numb( parsed[2], 13 ) - 1
				if( parsed[3] ) this.day =  numb( parsed[3], 32 ) - 1
				if( parsed[4] ) this.hour = numb( parsed[4], 60 )
				if( parsed[5] ) this.minute = numb( parsed[5], 60 )
				if( parsed[6] ) this.second = numb( parsed[6], 60 )
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
				
				const offset = - config.getTimezoneOffset()
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
			
			this.offset = config.offset == null ? config.offset as undefined : new $mol_time_duration( config.offset ) 

		}

		readonly year : number | undefined
		readonly month : number | undefined
		readonly day : number | undefined
		readonly hour : number | undefined
		readonly minute : number | undefined
		readonly second : number | undefined
		readonly offset : $mol_time_duration | undefined

		get weekday() {
			return ( this.native.getDay() + 6 ) % 7
		}

		_native : Date | undefined
		get native() {
			
			if( this._native ) return this._native
			
			const second = Math.floor( this.second ?? 0 )
			
			const native = new Date(
				this.year ?? 0 ,
				this.month ?? 0 ,
				( this.day ?? 0 ) + 1 ,
				this.hour ?? 0 ,
				this.minute ?? 0 ,
				second,
				Math.floor( ( ( this.second ?? 0 ) - second ) * 1000 ),
			)
			
			const offset = - native.getTimezoneOffset()
			shift: if( this.offset ) {
				const target = this.offset.count( 'PT1m' )
				if( target === offset ) break shift
				native.setMinutes( native.getMinutes() + offset - target )
			}
			
			return this._native = native
		}

		_normal : $mol_time_moment | undefined
		get normal() {
			if( this._normal ) return this._normal
			
			const moment = new $mol_time_moment( this.native )
			
			return this._normal = new $mol_time_moment({
				year : this.year === undefined ? undefined : moment.year ,
				month : this.month === undefined ? undefined : moment.month ,
				day : this.day === undefined ? undefined : moment.day ,
				hour : this.hour === undefined ? undefined : moment.hour ,
				minute : this.minute === undefined ? undefined : moment.minute ,
				second : this.second === undefined ? undefined : moment.second ,
				offset : this.offset === undefined ? undefined : moment.offset ,
			})
		}

		merge( config : $mol_time_moment_config ) {
			const moment = new $mol_time_moment( config )
			return new $mol_time_moment({
				year : moment.year === undefined ? this.year : moment.year ,
				month : moment.month === undefined ? this.month : moment.month ,
				day : moment.day === undefined ? this.day : moment.day ,
				hour : moment.hour === undefined ? this.hour : moment.hour ,
				minute : moment.minute === undefined ? this.minute : moment.minute ,
				second : moment.second === undefined ? this.second : moment.second ,
				offset : moment.offset === undefined ? this.offset : moment.offset ,
			})
		}

		shift( config : $mol_time_duration_config ) {
			const duration = new $mol_time_duration( config )
			const moment = new $mol_time_moment().merge({
				year: this.year ?? 0,
				month: this.month ?? 0,
				day: this.day ?? 0,
				hour: this.hour ?? 0,
				minute: this.minute ?? 0,
				second: this.second ?? 0,
				offset: this.offset ?? 0
			})

			const second = moment.second! + ( duration.second ?? 0 )
			const native = new Date(
				moment.year! + ( duration.year ?? 0 ) ,
				moment.month! + ( duration.month ?? 0 ) ,
				moment.day! + 1 + ( duration.day ?? 0 ) ,
				moment.hour! + ( duration.hour ?? 0 ) ,
				moment.minute! + ( duration.minute ?? 0 ) ,
				Math.floor( second ) ,
				( second - Math.floor( second ) ) * 1000
			)

			if( isNaN( native.valueOf() ) ) throw new Error( 'Wrong time' )

			return new $mol_time_moment({
				year : this.year === undefined ? undefined : native.getFullYear(),
				month : this.month === undefined ? undefined : native.getMonth(),
				day : this.day === undefined ? undefined : native.getDate() - 1,
				hour : this.hour === undefined ? undefined : native.getHours(),
				minute : this.minute === undefined ? undefined : native.getMinutes(),
				second : this.second === undefined ? undefined : native.getSeconds() + native.getMilliseconds() / 1000,
				offset : this.offset,
			})
		}

		mask( config : $mol_time_moment_config ) {

			const mask = new $mol_time_moment( config )
			
			return new $mol_time_moment({
				year : mask.year === undefined ? undefined : this.year ,
				month : mask.month === undefined ? undefined : this.month ,
				day : mask.day === undefined ? undefined : this.day ,
				hour : mask.hour === undefined ? undefined : this.hour ,
				minute : mask.minute === undefined ? undefined : this.minute ,
				second : mask.second === undefined ? undefined : this.second ,
				offset : mask.offset === undefined ? undefined : this.offset ,
			})
			
		}

		toOffset( config: $mol_time_duration_config = new $mol_time_moment().offset! ) {
			
			const duration = new $mol_time_duration( config )
			const offset = this.offset || new $mol_time_moment().offset!
			
			let with_time = new $mol_time_moment( '0001-01-01T00:00:00' ).merge( this ) 
		 	const moment = with_time.shift( duration.summ( offset.mult( -1 ) ) )

			return moment.merge({ offset : duration })
		}

		valueOf() { return this.native.getTime() }

		toJSON() { return this.toString() }

		toString( pattern = 'YYYY-MM-DDThh:mm:ss.sssZ' ) {
			return super.toString( pattern )
		}
		
		[ Symbol.toPrimitive ]( mode: 'default' | 'number' | 'string' ) {
			return mode === 'number' ? this.valueOf() : this.toString()
		}
		
		[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {},
				$mol_dev_format_native( this ),
				' ',
				$mol_dev_format_accent( this.toString( 'YYYY-MM-DD hh:mm:ss.sss Z' ) ),
			)
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
			
			'Month' : ( pattern => ( moment : $mol_time_moment )=> {
				if( moment.month == null ) return ''
				return pattern.format( moment.native )
			} )( new Intl.DateTimeFormat( undefined , { month : 'long' } ) ) ,
			
			'DD Month' : ( pattern => ( moment : $mol_time_moment )=> {
				if( moment.month == null ) {
					if( moment.day == null ) {
						return ''
					} else {
						return $mol_time_moment.patterns[ 'DD' ]( moment )
					}
				} else {
					if( moment.day == null ) {
						return $mol_time_moment.patterns[ 'Month' ]( moment )
					} else {
						return pattern.format( moment.native )
					}
				}
			} )(
				new Intl.DateTimeFormat( undefined , { day : '2-digit' , month : 'long' } )
			) ,
			
			'D Month' : ( pattern => ( moment : $mol_time_moment )=> {
				if( moment.month == null ) {
					if( moment.day == null ) {
						return ''
					} else {
						return $mol_time_moment.patterns[ 'D' ]( moment )
					}
				} else {
					if( moment.day == null ) {
						return $mol_time_moment.patterns[ 'Month' ]( moment )
					} else {
						return pattern.format( moment.native )
					}
				}
			} )(
				new Intl.DateTimeFormat( undefined , { day : 'numeric' , month : 'long' } )
			) ,
			
			'Mon' : ( pattern => ( moment : $mol_time_moment )=> {
				if( moment.month == null ) return ''
				return pattern.format( moment.native )
			} )( new Intl.DateTimeFormat( undefined , { month : 'short' } ) ) ,
			
			'DD Mon' : ( pattern => ( moment : $mol_time_moment )=> {
				if( moment.month == null ) {
					if( moment.day == null ) {
						return ''
					} else {
						return $mol_time_moment.patterns[ 'DD' ]( moment )
					}
				} else {
					if( moment.day == null ) {
						return $mol_time_moment.patterns[ 'Mon' ]( moment )
					} else {
						return pattern.format( moment.native )
					}
				}
			} )(
				new Intl.DateTimeFormat( undefined , { day : '2-digit' , month : 'short' } )
			) ,
			
			'D Mon' : ( pattern => ( moment : $mol_time_moment )=> {
				if( moment.month == null ) {
					if( moment.day == null ) {
						return ''
					} else {
						return $mol_time_moment.patterns[ 'D' ]( moment )
					}
				} else {
					if( moment.day == null ) {
						return $mol_time_moment.patterns[ 'Mon' ]( moment )
					} else {
						return pattern.format( moment.native )
					}
				}
			} )(
				new Intl.DateTimeFormat( undefined , { day : 'numeric' , month : 'short' } )
			) ,
			
			'-MM' : ( moment : $mol_time_moment )=> {
				if( moment.month == null ) return ''
				return '-' + $mol_time_moment.patterns[ 'MM' ]( moment )
			} ,
			
			'MM' : ( moment : $mol_time_moment )=> {
				if( moment.month == null ) return ''
				return String( 100 + moment.month + 1 ).slice(1)
			} ,
			
			'M' : ( moment : $mol_time_moment )=> {
				if( moment.month == null ) return ''
				return String( moment.month + 1 )
			} ,
			
			'WeekDay' : ( pattern => ( moment : $mol_time_moment )=> {
				if( moment.day == null ) return ''
				if( moment.month == null ) return ''
				if( moment.year == null ) return ''
				return pattern.format( moment.native )
			} )( new Intl.DateTimeFormat( undefined , { weekday : 'long' } ) ) ,

			'WD' : ( pattern => ( moment : $mol_time_moment )=> {
				if( moment.day == null ) return ''
				if( moment.month == null ) return ''
				if( moment.year == null ) return ''
				return pattern.format( moment.native )
			} )( new Intl.DateTimeFormat( undefined , { weekday : 'short' } ) ) ,
			
			'-DD' : ( moment : $mol_time_moment )=> {
				if( moment.day == null ) return ''
				return '-' + $mol_time_moment.patterns[ 'DD' ]( moment )
			} ,
			
			'DD' : ( moment : $mol_time_moment )=> {
				if( moment.day == null ) return ''
				return String( 100 + moment.day + 1 ).slice(1)
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
				return String( 100 + moment.hour ).slice(1)
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
				return String( 100 + moment.minute ).slice(1)
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
				return String( 100 + moment.second | 0 ).slice(1)
			},
			
			's' : ( moment : $mol_time_moment )=> {
				if( moment.second == null ) return ''
				return String( moment.second | 0 )
			} ,
			
			'.sss' : ( moment : $mol_time_moment )=> {
				if( moment.second == null ) return ''
				if( moment.second === ( moment.second | 0 ) ) return ''
				return '.' + $mol_time_moment.patterns[ 'sss' ]( moment )
			},
			
			'sss' : ( moment : $mol_time_moment )=> {
				if( moment.second == null ) return ''
				const millisecond = ( moment.second - Math.trunc( moment.second ) ).toFixed( 3 )
				return millisecond.slice(2)
			},
			
			'Z' : ( moment : $mol_time_moment )=> {
				
				const offset = moment.offset
				if( !offset ) return ''
				
				let hour = offset.hour

				let sign = '+'
				if( hour < 0 ) {
					sign = '-'
					hour = -hour
				}
				
				return sign + String( 100 + hour ).slice(1) + ':' + String( 100 + offset.minute ).slice(1)
			}

		}

	}

}
