namespace $ {

	export class $mol_error_mix extends AggregateError {

		name = $$.$mol_func_name( this.constructor )
		
		constructor( message: string, ... errors: Error[] ) {
			super(
				errors,
				[ message, ... errors.map( e => e.message.replace( /^/gm, '  ' ) ) ].join( '\n' ),
			)
		}
		
		get cause() {
			return ( [] as any[] ).concat(
				... this.errors.map( e => e.cause ).filter( Boolean )
			)
		}
		
		toJSON() {
			return this.errors.map( e => e.message )
		}
		
		pick< Error extends typeof Error >( Error: Error ) {
			
			if( ( this as any ) instanceof Error ) return this
			
			for( const e of this.errors ) {
				if( e instanceof Error ) return e
			}
			
			for( const e of this.cause ) {
				if( e && e instanceof Error ) return e
			}
			
			return null
		}

	}

}
