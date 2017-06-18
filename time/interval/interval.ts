namespace $ {

	export type $mol_time_interval_config = string | {
		start? : $mol_time_moment_config
		end? : $mol_time_moment_config
		duration? : $mol_time_duration_config
	}

	export class $mol_time_interval extends $mol_time_base {

		constructor( config : $mol_time_interval_config ) {
			
			super()
			
			if( typeof config === 'string' ) {
				
				var chunks = config.split( '/' )
				
				if( chunks[0] ) {
					if( chunks[0][0].toUpperCase() === 'P' ) {
						this._duration = new $mol_time_duration( chunks[0] )
					} else {
						this._start = new $mol_time_moment( chunks[0] )
					}
				} else {
					this._start = new $mol_time_moment()
				}
				
				if( chunks[1] ) {
					if( chunks[1][0].toUpperCase() === 'P' ) {
						this._duration = new $mol_time_duration( chunks[1] )
					} else {
						this._end = new $mol_time_moment( chunks[1] )
					}
				} else {
					this._end = new $mol_time_moment()
				}
				
				return
			}

			if( config.start !== undefined ) this._start = new $mol_time_moment( config.start )
			if( config.end !== undefined ) this._end = new $mol_time_moment( config.end )
			if( config.duration !== undefined ) this._duration = new $mol_time_duration( config.duration )
		}

		private _start : $mol_time_moment
		get start() {
			if( this._start ) return this._start
			
			return this._start = this._end.shift( this._duration.mult( -1 ) )
		}

		private _end : $mol_time_moment
		get end() {
			if( this._end ) return this._end
			
			return this._end = this._start.shift( this._duration )
		}

		private _duration : $mol_time_duration
		get duration() {
			if( this._duration ) return this._duration
			
			return this._duration = new $mol_time_duration( this._end.valueOf() - this._start.valueOf() )
		}

		toJSON() { return this.toString() }

		toString( ) {
			return ( this._start || this._duration || '' ).toString() + '/' + ( this._end || this._duration || '' ).toString()
		}

	}

}
