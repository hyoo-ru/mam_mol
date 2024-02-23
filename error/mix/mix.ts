namespace $ {

	export class $mol_error_mix extends AggregateError {
		
		name = $$.$mol_func_name( this.constructor ).replace( /^\$/, '' ) + '_Error'

		constructor( message: string, ... errors: Error[] ) {
			
			super(
				errors,
				message,
			)
			
			const stack_get = Object.getOwnPropertyDescriptor( this, 'stack' )?.get!
			
			Object.defineProperty( this, 'stack', {
				get: ()=> stack_get.call( this ) + '\n' + this.errors.map(
					e => e.stack.trim().replace( /at /gm, '   at ' ).replace( /^(?!    )(.*)/gm, '    at [$1] (#)' )
				).join('\n')
			} )
			
		}
		
		toJSON() {
			return this.errors.map( e => e.message )
		}
		
	}

}
