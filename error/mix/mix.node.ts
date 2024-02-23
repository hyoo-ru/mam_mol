namespace $ {

	export class $mol_error_mix< Cause extends {} = {} > extends AggregateError {
		
		name = $$.$mol_func_name( this.constructor ).replace( /^\$/, '' ) + '_Error'

		constructor(
			message: string,
			readonly cause?: Cause | null,
			... errors: Error[]
		) {
			super( errors, message, { cause } )
		}
		
	}

}
