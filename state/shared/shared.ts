namespace $ {
	
	export class $mol_state_shared extends $mol_object2 {
		
		server() {
			// return $mol_dom_context.document.location.origin.replace( /^\w+:/ , 'ws:' )
			return `wss://sync-hyoo-ru.herokuapp.com/`
		}
		
		server_clock = new $hyoo_crowd_clock
		
		@ $mol_mem
		peer() {
			return $mol_hash_string( this.keys_serial().public )
		}
		
		@ $mol_mem
		keys_serial() {
			
			const key = this + '.keys()'
			let serial = this.$.$mol_state_local.value( key ) as null | { public: string, private: string }
			if( serial ) return serial
			
			const pair = $mol_fiber_sync( this.$.$mol_crypto_auditor_pair ).call( $ )
				
			serial = {
				public: $mol_base64_encode(
					new Uint8Array(
						$mol_fiber_sync( pair.public.serial ).call( pair.public )
					)
				),
				private: $mol_base64_encode(
					new Uint8Array(
						$mol_fiber_sync( pair.private.serial ).call( pair.private )
					)
				),
			}
			
			$mol_fiber_defer( ()=> this.$.$mol_state_local.value( key, serial ) )
			
			return serial
		}
		
		@ $mol_mem
		keys() {
			
			const prev = this.keys_serial()
			
			return {
				public: $mol_fiber_sync( this.$.$mol_crypto_auditor_public.from )
					.call(
						this.$.$mol_crypto_auditor_public,
						$mol_base64_decode( prev.public ),
					),
				private: $mol_fiber_sync( this.$.$mol_crypto_auditor_private.from )
					.call(
						this.$.$mol_crypto_auditor_private,
						$mol_base64_decode( prev.private ),
					),
			}
			
		}
		
		@ $mol_mem
		store() {
			return new this.$.$hyoo_crowd_doc( this.peer() )
		}
		
		path() {
			return ''
		}
		
		node() {
			return this.store().root
		}
		
		@ $mol_mem_key
		doc( key: string ) {
			if( !key ) return this
			const State = this.constructor as typeof $mol_state_shared
			const state = new State
			state.path = $mol_const( this.path() ? this.path() + '/' + key : key )
			state.doc = k => this.doc( key + '/' + k )
			state.socket = ()=> this.socket()
			state.peer = ()=> this.peer()
			state.keys_serial = ()=> this.keys_serial()
			state.keys = ()=> this.keys()
			return state
		}
		
		@ $mol_mem_key
		sub( key: string ) {
			const State = this.constructor as typeof $mol_state_shared
			const state = new State
			state.node = $mol_const( this.node().sub( key ) )
			state.request = n => this.request( n )
			state.path = ()=> this.path()
			state.version_last = n => this.version_last( n )
			return state
		}
		
		@ $mol_mem
		version_last( next?: number ) {
			return this.store().clock.now
		}
		
		@ $mol_mem
		request( next?: unknown ) {
			
			this.socket()
			const store = this.store()
			
			if( next !== undefined ) {
				const pub = this.keys_serial().public
				store.root.sub( pub ).value( pub )
			}
			
			$mol_fiber_defer( ()=> {
				
				const delta = store.delta( this.server_clock )
				if( next !== undefined && !delta.length ) return
			
				this.send( this.path(), next === undefined && !delta.length ? [] : delta )
				
				for( const chunk of delta ) {
					this.server_clock.see( chunk.peer, chunk.time )
				}
				
			} )
			
			return null
		}
		
		@ $mol_mem
		value( next?: unknown ) {
			this.request( next )
			const res = this.node().value( next )
			this.version_last( next as any )
			return res
		}
		
		@ $mol_mem
		list( next?: readonly unknown[] ) {
			this.request( next )
			const res = this.node().list( next ) ?? []
			this.version_last( next as any )
			return res
		}
		
		@ $mol_mem
		text( next?: string ) {
			this.request( next )
			const res = this.node().text( next ) ?? ''
			this.version_last( next as any )
			return res
		}
		
		@ $mol_mem
		selection( next?: number[] ) {
			
			const node = this.node()
			
			this.version_last()
			
			if( next ) {
				this.selection_range( next.map( offset => node.point_by_offset( offset ) ) )
				return next
			} else {
				return this.selection_range().map( point => node.offset_by_point( point ) )
			}
			
		}
		
		@ $mol_mem
		selection_range( next?: { chunk: number, offset: number }[] ) {
			return next ?? [ { chunk: 0, offset: 0 }, { chunk: 0, offset: 0 } ]
		}
		
		@ $mol_mem
		socket() {
			
			this.heartbeat()
			
			const atom = $mol_atom2.current
			const socket = new $mol_dom_context.WebSocket( this.server() )
			
			socket.onmessage = $mol_fiber.func( event => {
				
				if( !event.data ) return
				const message = JSON.parse( event.data )
				
				if( !Array.isArray( message ) ) return
				
				let [ path, ... delta ] = message as [ string, ... $hyoo_crowd_chunk[] ]
				if( typeof path !== 'string' ) return
				if( !delta ) return
				
				const doc = this.doc( path )
				const store = doc.store()
				
				if( !delta.length ) {
					
					delta = store.delta() as $hyoo_crowd_chunk[]
					if( !delta.length ) return
					
					this.send( path, delta )
					return
					
				}
				
				store.apply( delta )
				
				for( const chunk of delta ) {
					doc.server_clock.see( chunk.peer, chunk.time )
				}
				
				doc.version_last( -1 )
				this.scheduled_enforcer( null )

			} )

			socket.onclose = ()=> {
				setTimeout( ()=> atom!.obsolete(), 5000 )
				this.scheduled_enforcer( null )
			}
			
			return socket
		}
		
		@ $mol_mem
		heartbeat() {
			
			const timer = setInterval( ()=> {
				const socket = this.socket()
				if( socket.readyState !== socket.OPEN ) return
				socket.send('')
			}, 30000 )
			
			return {
				destructor: ()=> clearInterval( timer )
			}
			
		}
		
		@ $mol_mem
		scheduled_enforcer( next?: null ) {
			// use case: system notification for invisible page
			return new $mol_after_timeout( 1000, $mol_fiber_warp )
		}
		
		@ $mol_fiber.method
		send( key: string, next?: readonly $hyoo_crowd_chunk[] ) {
			
			const socket = this.socket()
			
			if( socket.readyState === socket.CONNECTING ) {
				$mol_fiber_sync(
					()=> new Promise( done => socket.addEventListener( 'open', done ) )
				)()
			}
			
			if( socket.readyState !== socket.OPEN ) return
			
			const message = next === undefined ? [ key ] : [ key, ... next ]
			socket.send( JSON.stringify( message ) )
			
		}
		
	}
	
}
