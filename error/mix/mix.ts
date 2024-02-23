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

		pick<
			Instance extends Error,
			Class extends new (...args: any[]) => Instance
		>( Class: Class ) {
			return $mol_error_match<Instance>(this, e => e instanceof Class)
		}

	}

}
