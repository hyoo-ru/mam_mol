namespace $ {
	
	/** Shared local-first offline-ready store with [CROWD](https://github.com/hyoo-ru/crowd.hyoo.ru) conflict resolution. */
	export class $mol_state_shared extends $mol_object2 {
		
		@ $mol_mem
		db() {
			return $mol_wire_sync( this as $mol_state_shared ).db_init()
		}
		
		db_init() {
			
			type Scheme = {
				Docs: {
					Key: [ string ] // path
					Doc: readonly $hyoo_crowd_chunk[] // delta
					Indexes: {}
				}
			}
			
			return this.$.$mol_db< Scheme >( '$mol_state_shared_db',
				mig => mig.store_make( 'Chunks' ),
				mig => null, //mig.stores.Chunks.index_make( 'Path', [ 'path' ] ),
				mig => mig.store_drop( 'Chunks' ),
				mig => mig.store_make( 'Docs' ),
			)
			
		}
		
		server() {
			// return $mol_dom_context.document.location.origin.replace( /^\w+:/ , 'ws:' )
			return `wss://sync-hyoo-ru.herokuapp.com/`
		}
		
		db_clock = new $hyoo_crowd_clock
		
		@ $mol_mem
		peer() {
			const key = `${this}.peer()`
			const id = this.$.$mol_state_local.value( key )
			if( id ) return id as number
			return this.$.$mol_state_local.value(
				key,
				1 + Math.floor( Math.random() * ( 2 ** ( 6 * 8 ) - 2 ) ),
			)!
			// return $mol_hash_string( this.keys_serial().public )
		}
		
		// @ $mol_mem
		// keys_serial() {
			
		// 	const key = this + '.keys()'
		// 	let serial = this.$.$mol_state_local.value( key ) as null | { public: string, private: string }
		// 	if( serial ) return serial
			
		// 	const pair = $mol_wire_sync( this.$ ).$mol_crypto_auditor_pair()
				
		// 	serial = {
		// 		public: $mol_base64_encode(
		// 			new Uint8Array(
		// 				$mol_wire_sync( pair.public ).serial()
		// 			)
		// 		),
		// 		private: $mol_base64_encode(
		// 			new Uint8Array(
		// 				$mol_wire_sync( pair.private ).serial()
		// 			)
		// 		),
		// 	}
			
		// 	this.$.$mol_state_local.value( key, serial )
			
		// 	return serial
		// }
		
		// @ $mol_mem
		// keys() {
			
		// 	const prev = this.keys_serial()
			
		// 	return {
		// 		public: $mol_wire_sync( this.$.$mol_crypto_auditor_public ).from(
		// 			$mol_base64_decode( prev.public ),
		// 		),
		// 		private: $mol_wire_sync( this.$.$mol_crypto_auditor_private ).from(
		// 			$mol_base64_decode( prev.private ),
		// 		),
		// 	}
			
		// }
		
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
			// state.keys_serial = ()=> this.keys_serial()
			// state.keys = ()=> this.keys()
			state.db = ()=> this.db()
			return state
		}
		
		@ $mol_mem_key
		sub( key: string ) {
			const State = this.constructor as typeof $mol_state_shared
			const state = new State
			state.node = $mol_const( this.node().sub( key, $hyoo_crowd_struct ) )
			state.sync = ()=> this.sync()
			state.path = ()=> this.path()
			state.db = ()=> this.db()
			return state
		}
		
		@ $mol_mem
		request_done( next?: ( res: unknown )=> void ) {
			return ( res: unknown )=> {}
		}
		
		@ $mol_mem
		sync() {
			
			try {
				this.db_sync()
			} catch( error: any ) {
				if(!( error instanceof Promise )) $mol_fail_log( error )
			}
			
			try {
				this.server_sync()
			} catch( error: any ) {
				if(!( error instanceof Promise )) $mol_fail_log( error )
			}
			
			// const pub = this.keys_serial().public
			// store.root.sub( pub, $hyoo_crowd_reg ).value( pub )
			
			return null
		}
		
		@ $mol_mem
		db_sync() {
			
			this.db()
			
			const store = this.store()
			
			if( store.clock.now ) {
				if( store.clock.ahead( this.db_clock ) ) {
					$mol_wire_sync( this ).db_save()
				}
			} else {
				$mol_wire_sync( this ).db_load()
			}
			
			return null
		}
		
		async db_load() {
			
			const db = this.db()
			const Docs = db.read( 'Docs' ).Docs
			
			const path = this.path()
			const delta = await Docs.get([ path ])
			if( !delta ) return
			
			const store = this.store()
			store.apply( delta )
			
			this.db_clock.sync( store.clock )
				
		}
		
		async db_save() {
			
			const path = this.path()
			const db = this.db()
			const store = this.store()
			
			const trans = db.change( 'Docs' )
			const Docs = trans.stores.Docs
			
			const stored = await Docs.get([ path ]) ?? []
			store.apply( stored )
			
			Docs.put( store.delta() , [ path ] )
			trans.commit()
			
			this.db_clock.sync( store.clock )
			
			return null
		}
		
		@ $mol_mem
		server_sync() {
			
			this.socket()
			
			const store = this.store()
			const server_clock = this.server_clock()
			const delta = store.delta( server_clock )
			
			if( delta.length || !server_clock.now ) {
				this.send( this.path(), delta )
				server_clock.sync( store.clock )
			}
			
			return null
		}
		
		@ $mol_mem
		value( next?: unknown ) {
			const res = this.node().as( $hyoo_crowd_reg ).value( next )
			this.sync()
			return res
		}
		
		@ $mol_mem
		list( next?: readonly unknown[] ) {
			const res = this.node().as( $hyoo_crowd_list ).list( next ) ?? []
			this.sync()
			return res
		}
		
		@ $mol_mem
		text( next?: string ) {
			const res = this.node().as( $hyoo_crowd_text ).text( next ) ?? ''
			this.sync()
			return res
		}
		
		@ $mol_mem
		selection( next?: number[] ) {
			
			const node = this.node().as( $hyoo_crowd_text )
			
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
		server_clock() {
			this.socket()
			return new $hyoo_crowd_clock
		}
		
		@ $mol_mem
		socket( reset?: null ) {
			
			this.heartbeat()
			
			// const atom = $mol_atom2.current
			const socket = new $mol_dom_context.WebSocket( this.server() )
			
			socket.onmessage = event => {
				
				if( !event.data ) return
				const message = JSON.parse( event.data )
				
				if( !Array.isArray( message ) ) return
				
				let [ path, ... delta ] = message as [ string, ... $hyoo_crowd_chunk[] ]
				if( typeof path !== 'string' ) return
				if( !delta ) return
				
				const doc = this.doc( path )
				const store = doc.store()
				
				// doc.request_done()( null )
				
				if( !delta.length ) {
					
					// delta = store.delta() as $hyoo_crowd_chunk[]
					// if( !delta.length ) return
					
					// this.send( path, delta )
					// return
					
				}
				
				store.apply( delta )
				doc.server_clock().sync( store.clock )
				
			}

			socket.onclose = ()=> {
				setTimeout( ()=> this.socket( null ), 5000 )
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
		
		@ $mol_action
		send( key: string, next?: readonly $hyoo_crowd_chunk[] ) {
			
			const socket = this.socket()
			$mol_wire_sync( this ).wait_connection()
			
			if( socket.readyState !== socket.OPEN ) return
			
			const message = next === undefined ? [ key ] : [ key, ... next ]
			socket.send( JSON.stringify( message ) )
			
		}
		
		wait_connection() {
			const socket = this.socket()
			if( socket.readyState !== socket.CONNECTING ) return
			return new Promise( done => socket.addEventListener( 'open', done ) )
		}
		
	}
	
}
