namespace $ {

	@ $mol_class
	export class $mol_wrapper extends $mol_object2 {

		static wrap : ( task : ( ... ags : any[] )=> any )=> ( ... ags : any[] )=> any
		
		static run< Result >( task : ()=> Result ) : Result {
			return this.func( task )()
		}
	
		static func< Host , Args extends any[] , Result >(
			func : ( this : Host , ... args : Args )=> Result
		) : ( this : Host , ... args : Args )=> Result {
			const wrapped = this.wrap( func )
			
			Object.defineProperty( wrapped , 'name' , {
				value : `${ func.name || '<anonymous>' }|${ this.name }`
			} )
			
			return wrapped
		}

		static get class() {

			return < Args extends any[] , Result extends object >(
				Class : new ( ... args : Args )=> Result
			) => {

				const construct = ( target : new ( ... args : Args )=> Result , args : Args )=> new Class( ... args )

				const handler = {
					construct : this.func( construct )
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
				descr.value = this.func( descr.value! )
				return descr
			}
			
		}

	}

}
