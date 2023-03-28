namespace $ {

	export class $mol_wrapper extends $mol_object2 {

		static wrap : ( task : ( ... ags : any[] )=> any )=> ( ... ags : any[] )=> any
		
		static run< Result >( task : ()=> Result ) : Result {
			return this.func( task )()
		}
	
		static func< Args extends any[] , Result , Host = void >(
			func : ( this : Host , ... args : Args )=> Result
		) : ( this : Host , ... args : Args )=> Result {
			return this.wrap( func )
		}

		static get class() {

			return < Class extends new ( ... args : any[] )=> any >(
				Class : Class
			) => {

				type Args = ConstructorParameters< Class >
				type Result = InstanceType< Class >

				const construct = ( target : Class , args : Args )=> new Class( ... args )

				const handler: ProxyHandler<Class> = {
					construct : this.func( construct )
				} 

				;(handler as any)[ Symbol.toStringTag ] = Class.name + '#'

				return new Proxy( Class , handler )
				
			}

		}

		static get method() {
			
			return (
				obj : object,
				name : PropertyKey,
				descr : PropertyDescriptor,
			) => {
				descr.value = this.func( descr.value! )
				return descr
			}
			
		}

		static get field() {
			
			return <
				Host ,
				Field extends keyof Host ,
				Args extends any[] ,
				Result ,
			>(
				obj : Host ,
				name : Field ,
				descr : TypedPropertyDescriptor< Result >
			) => {
				descr.get = descr.set = this.func( descr.get! )
				return descr
			}
			
		}

	}

}
