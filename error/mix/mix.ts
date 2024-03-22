namespace $ {

	export class $mol_error_mix< Cause extends {} = {} > extends AggregateError {
		
		name = $$.$mol_func_name( this.constructor ).replace( /^\$/, '' ) + '_Error'

		constructor(
			message: string,
			readonly cause = {} as Cause,
			... errors: Error[]
		) {
			
			super( errors, message, { cause } )
			
			const stack_get = Object.getOwnPropertyDescriptor( this, 'stack' )?.get ?? ( ()=> super.stack )
			
			Object.defineProperty( this, 'stack', {
				get: ()=> ( stack_get.call( this ) ?? this.message ) + '\n' + [ JSON.stringify( this.cause, null, '  ' ) ?? 'no cause', ... this.errors.map( e => e.stack ) ].map(
					e => e.trim()
						.replace( /at /gm, '   at ' )
						.replace( /^(?!    +at )(.*)/gm, '    at | $1 (#)' )
				).join('\n')
			} )
			
		}

		static make(
			...params: ConstructorParameters<typeof $mol_error_mix>
		) {
			return new this(...params)
		}
		
	}

}
