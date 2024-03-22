namespace $ {

	export type $mol_time_duration_config = number | string | {
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
					const parser = /^P(?:([+-]?\d+(?:\.\d+)?)Y)?(?:([+-]?\d+(?:\.\d+)?)M)?(?:([+-]?\d+(?:\.\d+)?)D)?(?:T(?:([+-]?\d+(?:\.\d+)?)h)?(?:([+-]?\d+(?:\.\d+)?)m)?(?:([+-]?\d+(?:\.\d+)?)s)?)?$/i
					
					const found = parser.exec( config )
					if( !found ) break duration
						
					if( found[1] ) this.year = Number( found[1] )
					if( found[2] ) this.month = Number( found[2] )
					if( found[3] ) this.day = Number( found[3] )
					if( found[4] ) this.hour = Number( found[4] )
					if( found[5] ) this.minute = Number( found[5] )
					if( found[6] ) this.second = Number( found[6] )
					
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
			
		}

	}

}
