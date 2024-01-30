namespace $ {

	export class $mol_error_mix extends AggregateError {

		name = '$mol_data_error'
		constructor( message: string, ... errors: Error[] ) {
			super(
				errors,
				[ message, ... errors.map( e => '  ' + e.message ) ].join( '\n' ),
			)
		}
		
		toJSON() {
			return this.message
		}

	}

}
