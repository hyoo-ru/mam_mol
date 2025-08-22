namespace $ {

	function cause_serialize(cause: unknown) {
		return JSON.stringify( cause, null, '  ' )
			.replace(/\(/,'<')
			.replace(/\)/,' >')
	}

	function frame_normalize(frame: string | Object) {
		return ( typeof frame  === 'string' ? frame : cause_serialize(frame) )
			.trim()
			.replace( /at /gm, '   at ' )
			.replace( /^(?!    +at )(.*)/gm, '    at | $1 (#)' )
	}

	export class $mol_error_mix< Cause extends {} = {} > extends AggregateError {
		
		name = $$.$mol_func_name( this.constructor ).replace( /^\$/, '' ) + '_Error'

		constructor(
			message: string,
			readonly cause = {} as Cause,
			... errors: readonly Error[]
		) {
			
			super( errors, message, { cause } )
			
			const desc = Object.getOwnPropertyDescriptor( this, 'stack' )
			const stack_get = ()=> desc?.get?.() ?? super.stack ?? desc?.value ?? this.message
			
			Object.defineProperty( this, 'stack', {
				get: ()=> stack_get() + '\n' + [
						this.cause ?? 'no cause',
						... this.errors.flatMap( e => [
							String( e.stack ),
							... e instanceof $mol_error_mix || ! e.cause ? [] : [ e.cause ]
						] )
					].map(frame_normalize).join('\n')
			} )

			// в nodejs, что б не дублировалось cause в консоли
			Object.defineProperty(this, 'cause', {
				get: () => cause
			})	
		}

		static [ Symbol.toPrimitive ]() {
			return this.toString()
		}
		
		static toString() {
			return $$.$mol_func_name( this )
		}

		static make(
			...params: ConstructorParameters<typeof $mol_error_mix>
		) {
			return new this(...params)
		}
		
	}

}
