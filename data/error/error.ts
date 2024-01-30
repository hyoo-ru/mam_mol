namespace $ {

	export class $mol_data_error extends AggregateError {
		name = '$mol_data_error'
		constructor( message: string, errors = [] as Error[] ) {
			super( errors, [ message, ... errors.map( e => '  ' + e.message ) ].join( '\n' ) )
		}
	}

}
