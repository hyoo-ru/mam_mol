namespace $ {
	
	export class $mol_state_shared extends $mol_object2 {
		
		@ $mol_mem
		db() {
			return $mol_wire_sync( this ).db_init()
		}
		
		db_init() {
			
			type Scheme = {
				Chunks: {
					Key: [ string, number, number ] // path, head, self
					Doc: { path: string, chunk: $hyoo_crowd_chunk }
					Indexes: {
						Path: [ string ]
					}
				}
			}
			
			return this.$.$mol_db< Scheme >( '$mol_state_shared_db',
				mig => mig.store_make( 'Chunks' ),
				mig => mig.stores.Chunks.index_make( 'Path', [ 'path' ] ),
			)
			
		}
		
		server() {
			// return $mol_dom_context.document.location.origin.replace( /^\w+:/ , 'ws:' )
			return `wss://sync-hyoo-ru.herokuapp.com/`
		}
		
		server_clock = new $hyoo_crowd_clock
		db_clock = new $hyoo_crowd_clock
		
		@ $mol_mem
		peer() {
			return $mol_hash_string( this.keys_serial().public )
		}
		
		@ $mol_mem
		keys_serial() {
			
			const key = this + '.keys()'
			let serial = this.$.$mol_state_local.value( key ) as null | { public: string, private: string }
			if( serial ) return serial
			
			const pair = $mol_wire_sync( this.$ ).$mol_crypto_auditor_pair()
				
			serial = {
				public: $mol_base64_encode(
					new Uint8Array(
						$mol_wire_sync( pair.public ).serial()
					)
				),
				private: $mol_base64_encode(
					new Uint8Array(
						$mol_wire_sync( pair.private ).serial()
					)
				),
			}
			
			this.$.$mol_state_local.value( key, serial )
			
			return serial
		}
		
		@ $mol_mem
		keys() {
			
			const prev = this.keys_serial()
			
			return {
				public: $mol_wire_sync( this.$.$mol_crypto_auditor_public ).from(
					$mol_base64_decode( prev.public ),
				),
				private: $mol_wire_sync( this.$.$mol_crypto_auditor_private ).from(
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
			state.db = ()=> this.db()
			return state
		}
		
		@ $mol_mem_key
		sub( key: string ) {
			const State = this.constructor as typeof $mol_state_shared
			const state = new State
			state.node = $mol_const( this.node().sub( key, $hyoo_crowd_struct ) )
			state.request = n => this.request( n )
			state.path = ()=> this.path()
			// state.version_last = n => this.version_last( n )
			state.db = ()=> this.db()
			return state
		}
		
		@ $mol_mem
		version_last( next?: number ) {
			return this.store().clock.now
		}
		
		@ $mol_mem
		request_done( next?: ( res: unknown )=> void ) {
			return ( res: unknown )=> {}
		}
		
		async db_load() {
			
			const db = this.db()
			const Chunks = db.read( 'Chunks' ).Chunks
			
			const path = this.path()
			const res = await Chunks.indexes.Path.select([ path ])
			const delta = res.map( doc => doc.chunk )
				.filter( Boolean )
			
			const store = this.store()
			store.apply( delta )
			// this.version_last( -1 )
				
		}
		
		@ $mol_mem
		request( next?: unknown ) {
			
			const db = this.db()
			this.socket()
			const store = this.store()
			const path = this.path()
			
			// this.db_load()
			
			if( next === undefined ) {
				
				// $mol_fiber.run( ()=> {
				// 	$mol_fiber_defer( ()=> {
				// 		const Chunks = db.read( 'Chunks' ).Chunks
				// 		const delta = $mol_fiber_sync( ()=> Chunks.indexes.Path.select([ path ]) )()
				// 		if( delta.length ) {
				// 			store.apply( delta )
				// 			this.version_last( -1 )
				// 		}
				// 	} )
				// } )
				
			} else {
				
				const pub = this.keys_serial().public
				store.root.sub( pub, $hyoo_crowd_reg ).value( pub )
				
			}
			
			// $mol_fiber.run( ()=> {
			// 	$mol_fiber_defer( ()=> {
					
			// 		const delta = store.delta( this.server_clock )
			// 		if( next !== undefined && !delta.length ) return
					
			// 		if( next !== undefined ) {
						
			// 			const trans = db.change( 'Chunks' )
			// 			const Chunks = trans.stores.Chunks
			// 			for( const chunk of delta ) {
			// 				// console.log({ ... chunk, path })
			// 				Chunks.put( { path, chunk }, [ path, chunk.head, chunk.self ] )
			// 			}
			// 			trans.commit()//.then(console.log)
		
			// 		}
					
			// 		if( delta.length ) {
			// 			this.send( path, next === undefined && !delta.length ? [] : delta )
			// 		}
					
			// 		for( const chunk of delta ) {
			// 			this.server_clock.see( chunk.peer, chunk.time )
			// 		}
					
			// 	} )
			// } )
			
			if( next === undefined ) {
				
				// $mol_fiber.run( ()=> {
				// 	$mol_fiber_defer( ()=> { this.send( path, [] ) } )
				// } )
				
			}
			// if( $mol_dom_context.navigator.onLine && next === undefined ) {
			// 	const prev = $mol_mem_cached( ()=> this.request() )
			// 	if( prev === undefined ) {
			// 		const wait = $mol_fiber_sync(
			// 			()=> new Promise( done => {
			// 				$mol_mem_cached( ()=> this.request_done(),  done )
			// 				new $mol_after_timeout( 5000, ()=> done( null ) )
			// 			} )
			// 		)
			// 		wait()
			// 	}
			// }
			
			return null
		}
		
		@ $mol_mem
		value( next?: unknown ) {
			this.request( next )
			const res = this.node().as( $hyoo_crowd_reg ).value( next )
			// this.version_last( next as any )
			return res
		}
		
		@ $mol_mem
		list( next?: readonly unknown[] ) {
			this.request( next )
			const res = this.node().as( $hyoo_crowd_list ).list( next ) ?? []
			// this.version_last( next as any )
			return res
		}
		
		@ $mol_mem
		text( next?: string ) {
			this.request( next )
			const res = this.node().as( $hyoo_crowd_text ).text( next ) ?? ''
			// this.version_last( next as any )
			return res
		}
		
		@ $mol_mem
		selection( next?: number[] ) {
			
			const node = this.node().as( $hyoo_crowd_text )
			
			// this.version_last()
			
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
			
			const db = this.db()
			this.heartbeat()
			
			// const atom = $mol_atom2.current
			const socket = new $mol_dom_context.WebSocket( this.server() )
			
			socket.onmessage = $mol_fiber_root( event => {
				
				if( !event.data ) return
				const message = JSON.parse( event.data )
				
				if( !Array.isArray( message ) ) return
				
				let [ path, ... delta ] = message as [ string, ... $hyoo_crowd_chunk[] ]
				if( typeof path !== 'string' ) return
				if( !delta ) return
				
				const doc = this.doc( path )
				const store = doc.store()
				
				doc.request_done()( null )
				
				if( !delta.length ) {
					
					delta = store.delta() as $hyoo_crowd_chunk[]
					if( !delta.length ) return
					
					this.send( path, delta )
					return
					
				}
				
				const trans = db.change( 'Chunks' )
				const Chunks = trans.stores.Chunks
				for( const chunk of delta ) {
					Chunks.put( { path, chunk }, [ path, chunk.head, chunk.self ] )
				}
				trans.commit()
				
				store.apply( delta )
				
				for( const chunk of delta ) {
					doc.server_clock.see( chunk.peer, chunk.time )
				}
				
				// doc.version_last( -1 )

			} )

			socket.onclose = ()=> {
				// setTimeout( ()=> atom!.obsolete(), 5000 )
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
		
		@ $mol_wire_method
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
