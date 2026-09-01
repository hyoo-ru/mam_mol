namespace $ {

	export class $mol_shared extends $mol_object2 {

		@( $mol_action as any )
		static value< Value >( key : string , next? : Value ) {
			return this.$.$mol_fetch.json(
				'https://sync-hyoo-ru.herokuapp.com/' + key ,
				next === undefined
					? undefined
					: {
						method : 'PUT' ,
						headers : {
							'content-type' : 'application/json' ,
						} ,
						body : JSON.stringify( next ) ,
					} ,
			) as Value
		}

		@( $mol_action as any )
		static daily< Value >( key: string, request: ()=> Value, refresh = false ) {
			
			const today  = new this.$.$mol_time_moment().mask('0000-00-00')

			if( !refresh ) try {

				const cache = this.value<{ date : string, value : Value }>( key ) ?? {}

				if( cache.date ) {
					const interval = new this.$.$mol_time_interval({
						start: cache.date,
						end: today,
					})
					const age = interval.duration.count( 'P1D' )
					if( age < 1 ) return cache.value
				}

			} catch( error: any ) {
				if( error instanceof Promise ) return $mol_fail_hidden( error )
				console.error( error )
			}

			const value = request()

			try {

				this.$.$mol_shared.value( key , {
					date : today.toString() ,
					value ,
				} )

			} catch( error: any ) {
				if( error instanceof Promise ) return $mol_fail_hidden( error )
				console.error( error )
			}
			
			return value
		}
		
	}

}
