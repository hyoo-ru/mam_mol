namespace $ {

	export type $mol_time_duration_config = number | string | readonly[ number, number, number, number, number, number ] | {
		year? : number
		month? : number
		day? : number
		hour? : number
		minute? : number
		second? : number
	}

	/**
	 * Small, simple, powerful, and fast TypeScript/JavaScript library for proper date/time/duration/interval arithmetic.
	 *
	 * Immutable iso8601 time duration representation.
	 * @see http://localhost:9080/mol/app/docs/-/test.html#!demo=mol_time_demo
	 */
	export class $mol_time_duration extends $mol_time_base {

		constructor( config : $mol_time_duration_config = 0 ) {
			
			super()
			
			if( typeof config === 'number' ) {
				if( !Number.isFinite( config ) ) throw new RangeError( `Wrong ms count` )
				this.second = config / 1000
				return
			}

			if( typeof config === 'string' ) {
				
				if( config === 'Z' ) {
					
					this.hour = 0
					this.minute = 0
					
					return
				}

				duration: {
					const parser = /^(-?)P(?:([+-]?\d+(?:\.\d+)?)Y)?(?:([+-]?\d+(?:\.\d+)?)M)?(?:([+-]?\d+(?:\.\d+)?)D)?(?:T(?:([+-]?\d+(?:\.\d+)?)h)?(?:([+-]?\d+(?:\.\d+)?)m)?(?:([+-]?\d+(?:\.\d+)?)s)?)?$/i
					
					const found = parser.exec( config )
					if( !found ) break duration
						
					const sign = found[1] ? -1 : 1
					if( found[2] ) this.year = sign * Number( found[2] )
					if( found[3] ) this.month = sign * Number( found[3] )
					if( found[4] ) this.day = sign * Number( found[4] )
					if( found[5] ) this.hour = sign * Number( found[5] )
					if( found[6] ) this.minute = sign * Number( found[6] )
					if( found[7] ) this.second = sign * Number( found[7] )
					
					return
				}

				offset: {
					var parser = /^[+-](\d\d)(?::?(\d\d))?$/i
					
					var found = parser.exec( config )
					if( !found ) break offset
						
					if( found[1] ) this.hour = Number( found[1] )
					if( found[2] ) this.minute = Number( found[2] )
					
					return
				}

				throw new Error( `Can not parse time duration (${ config })` )
			}
			
			if( config instanceof Array ) {
				;[ this.year, this.month, this.day, this.hour, this.minute, this.second ] = config
				return
			}
			
			this.year = config.year || 0
			this.month = config.month || 0
			this.day = config.day || 0
			this.hour = config.hour || 0
			this.minute = config.minute || 0
			this.second = config.second || 0
			
		}

		readonly year : number= 0
		readonly month : number = 0
		readonly day : number = 0
		readonly hour : number = 0
		readonly minute : number = 0
		readonly second : number = 0
		
		get normal() {
			
			let second = this.second ?? 0
			let minute = this.minute ?? 0
			let hour = this.hour ?? 0
			let day = this.day ?? 0
			
			minute += Math.trunc( second / 60 )
			second = second % 60
			
			hour += Math.trunc( minute / 60 )
			minute = minute % 60
			
			day += Math.trunc( hour / 24 )
			hour = hour % 24
			
			return new $mol_time_duration({
				year: this.year,
				month: this.month,
				day: day,
				hour: hour,
				minute: minute,
				second: second,
			})
			
		}

		summ( config : $mol_time_duration_config ) {
			const duration = new $mol_time_duration( config )
			
			return new $mol_time_duration({
				year : this.year + duration.year ,
				month : this.month + duration.month ,
				day : this.day + duration.day ,
				hour : this.hour + duration.hour ,
				minute : this.minute + duration.minute ,
				second : this.second + duration.second ,
			})
		}

		mult( numb : number ) {
			return new $mol_time_duration({
				year : this.year && this.year * numb ,
				month : this.month && this.month * numb ,
				day : this.day && this.day * numb ,
				hour : this.hour && this.hour * numb ,
				minute : this.minute && this.minute * numb ,
				second : this.second && this.second * numb ,
			})
		}

		count( config : $mol_time_duration_config ) {
			const duration = new $mol_time_duration( config )
			return this.valueOf() / duration.valueOf()
		}

		valueOf() {
			var day = this.year * 365 + this.month * 30.4 + this.day
			var second = ( ( day * 24 + this.hour ) * 60 + this.minute ) * 60 + this.second
			return second * 1000
		}

		toJSON() { return this.toString() }

		toString( pattern = 'P#Y#M#DT#h#m#s' ) {
			return super.toString( pattern )
		}

		toArray() {
			return [ this.year, this.month, this.day, this.hour, this.minute, this.second ] as const
		
		}
		
		[ Symbol.toPrimitive ]( mode: 'default' | 'number' | 'string' ) {
			return mode === 'number' ? this.valueOf() : this.toString()
		}
		
		static patterns = {

			'#Y' : ( duration : $mol_time_duration )=> {
				if( !duration.year ) return ''
				return duration.year + 'Y'
			} ,
			
			'#M' : ( duration : $mol_time_duration )=> {
				if( !duration.month ) return ''
				return duration.month + 'M'
			} ,
			
			'#D' : ( duration : $mol_time_duration )=> {
				if( !duration.day ) return ''
				return duration.day + 'D'
			} ,
			
			'#h' : ( duration : $mol_time_duration )=> {
				if( !duration.hour ) return ''
				return duration.hour + 'H'
			} ,
			
			'#m' : ( duration : $mol_time_duration )=> {
				if( !duration.minute ) return ''
				return duration.minute + 'M'
			} ,
			
			'#s' : ( duration : $mol_time_duration )=> {
				if( !duration.second ) return ''
				return duration.second + 'S'
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
				// if( moment.second === ( moment.second | 0 ) ) return ''
				return '.' + $mol_time_moment.patterns[ 'sss' ]( moment )
			},
			
			'sss' : ( moment : $mol_time_moment )=> {
				if( moment.second == null ) return ''
				const millisecond = ( moment.second - Math.trunc( moment.second ) ).toFixed( 3 )
				return millisecond.slice(2)
			},
			
		}

	}

}
