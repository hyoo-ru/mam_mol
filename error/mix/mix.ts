namespace $ {

	export class $mol_error_mix< Cause extends {} = {} > extends AggregateError {
		
		name = $$.$mol_func_name( this.constructor ).replace( /^\$/, '' ) + '_Error'

		constructor(
			message: string,
			readonly cause?: Cause | null,
			... errors: Error[]
		) {
			
			super( errors, message, { cause } )
			
			const stack_get = Object.getOwnPropertyDescriptor( this, 'stack' )?.get ?? ( ()=> super.stack )
			
			Object.defineProperty( this, 'stack', {
				get: ()=> stack_get.call( this ) + '\n' + this.errors.map(
					e => e.stack.trim().replace( /at /gm, '   at ' ).replace( /^(?!    )(.*)/gm, '    at [$1] (#)' )
				).join('\n')
			} )
			
		}
		
	}

}
