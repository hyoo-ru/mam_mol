namespace $ {

	export class $mol_rpc_client_frame< Handlers > extends $mol_object {

		@ $mol_mem_key
		static item< Handlers >( uri : string ) {
			return this.make({ uri : $mol_const( uri ) }) as $mol_rpc_client_frame< Handlers >
		}

		uri() {
			return ''
		}

		@ $mol_mem
		frame() {
			return $mol_fiber_sync( ()=> new Promise< HTMLIFrameElement >( ( done , fail )=> {
				const frame = this.$.$mol_dom_context.document.createElement( 'iframe' )
				frame.src = this.uri()
				frame.onload = $mol_fiber_root( event => done( frame ) )
				frame.style.display = 'none'
				this.$.$mol_dom_context.document.documentElement.appendChild( frame )
			} ) ) ()
		}

		@ $mol_mem_key
		call( { name , args } : { name : string , args : any[] } ) {

			return $mol_fiber_sync( ()=> new Promise( ( done , fail )=> {
			
				const id = `$mol_rpc_client_frame:${ Date.now().toString(16) }`
				
				this.frame().contentWindow!.postMessage( { id , name , args } , '*' )
				
				const handle = ( event : MessageEvent )=> {
					if( event.data.id !== id ) return

					this.$.$mol_dom_context.removeEventListener( 'message' , handle )
					
					if( event.data.error ) fail( new Error( event.data.error ) )
					else done( event.data.result )
				}
				this.$.$mol_dom_context.addEventListener( 'message' , $mol_fiber_root( handle ) )
				
			} ) ) ()

		}

		@ $mol_mem
		proxy() {
			return new Proxy( {} , {
				get : ( target : any , name : string )=> {
					return ( ... args : any[] )=> this.call({ name , args })
				}
			} )
		}

	}

}
