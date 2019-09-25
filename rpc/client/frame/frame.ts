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
		frame() : HTMLFrameElement {
			const atom = $mol_atom_current()
			const frame = this.$.$mol_dom_context.document.createElement( 'iframe' )
			frame.src = this.uri()
			frame.onload = $mol_log_group( `${ this }.frame() load` , ( event : Event )=> atom.push( frame ) )
			frame.style.display = 'none'
			this.$.$mol_dom_context.document.documentElement.appendChild( frame )
			throw new $mol_atom_wait( `Connecting to ${ this.uri() }` )
		}

		@ $mol_mem_key
		call( { name , args } : { name : string , args : any[] } ) {
			const atom = $mol_atom_current()
			const id = `$mol_rpc_client_frame:${ Date.now().toString(16) }`
			
			this.frame().contentWindow.postMessage( { id , name , args } , '*' )
			
			const handle = $mol_log_group( `${ this }.call(${ JSON.stringify({ name , args }) }) message` , ( event : MessageEvent )=> {
				if( event.data.id !== id ) return

				this.$.$mol_dom_context.removeEventListener( 'message' , handle )
				
				if( event.data.error ) atom.push( new Error( event.data.error ) )
				else atom.push( event.data.result )
			} )
			this.$.$mol_dom_context.addEventListener( 'message' , handle )
			
			throw new $mol_atom_wait( `RPC ${ name }:${ id }` )
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
