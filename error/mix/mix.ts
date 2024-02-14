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
		
		pick< Class extends typeof Error >( Class: Class ): InstanceType< Class > | null {
			
			if( ( this as any ) instanceof Class ) return this as any
			
			for( const e of this.errors ) {
				if( e instanceof Class ) return e as any
			}
			
			for( const e of this.cause ) {
				if( e && e instanceof Class ) return e as any
			}
			
			return null
		}

	}

}
