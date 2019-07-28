namespace $ {

	@ $mol_class
	export class $mol_wrapper {

		static run : ( task : ()=> any )=> any
	
		static func< Host , Args extends any[] , Result >(
			func : ( this : Host , ... args : Args )=> Result
		) {

			const wrapper = this
			
			const wrapped = function $mol_wrapper_wrapped( this : Host , ... args : Args ) {
				const action = () => func.call( this , ... args )
				return wrapper.run( action )
			}
			
			return wrapped
		}

		static get class() {

			return < Args extends any[] , Result >(
				Class : new ( ... args : Args )=> Result
			) => {

				const handler = {
					construct : ( target , args : Args )=> {
						const action = ()=> new Class( ... args )
						return this.run( action )
					}
				}

				handler[ Symbol.toStringTag ] = Class.name + '#'

				return new Proxy( Class , handler )
				
			}

		}

		static get method() {
			
			return <
				Host ,
				Field extends keyof Host ,
				Args extends any[] ,
				Result ,
			>(
				obj : Host ,
				name : Field ,
				descr : TypedPropertyDescriptor< ( this : Host , ... args : Args )=> Result >
			) => {
				descr.value = this.func( descr.value )
			}
			
		}

	}

}
