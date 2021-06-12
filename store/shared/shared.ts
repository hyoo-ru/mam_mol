namespace $ {
	
	export type $mol_store_shared_data = Record< string , $hyoo_crowd_delta_value | string[] >
	
	export class $mol_store_shared extends $mol_store< $mol_store_shared_data > {
		
		@ $mol_mem_key
		store( prefix: string ) {
			return new this.$.$hyoo_crowd_graph
		}
		
		@ $mol_mem_key
		version_last( prefix: string, next?: number ) {
			return next ?? this.store( prefix ).clock.version_max
		}
		
		@ $mol_mem_key
		request( prefix: string ) {
			
			this.socket()
			
			$mol_fiber_defer( ()=>
				this.send(
					prefix,
					this.store( prefix ).delta(),
				)
			)
			
			return null
		}
		
		@ $mol_mem_key
		value< Key extends keyof $mol_store_shared_data >(
			key: Key,
			next?: $mol_store_shared_data[ Key ],
		) {
			
			let [ prefix, ... tail ] = key.split( '/' )
			let suffix = tail.join( '/' )
			
			if( !suffix ) {
				suffix = prefix
				prefix = ''
			}
			
			const store = this.store( prefix )
			const prev = $mol_mem_cached( ()=> this.value( key ) )

			this.request( prefix )
			this.version_last( prefix )
			
			if( next == undefined ) {
				
				const delta = this.$.$mol_store_local.value( prefix )
				if( delta ) store.apply( delta )
				
				return store.value( suffix )!
				
			} else {
				
				const val = store.value( suffix, next )
				
				$mol_fiber_defer( ()=>
					this.send(
						prefix,
						store.delta(),
					)
				)
				
				this.$.$mol_store_local.value( prefix, store.delta() )
				
				return val!
			}
		}
		
		@ $mol_mem_key
		selection<
			Key extends keyof $mol_store_shared_data
		>( key: Key, next?: number[] ) {
			
			let [ prefix, ... tail ] = key.split( '/' )
			let suffix = tail.join( '/' )
			
			if( !suffix ) {
				suffix = prefix
				prefix = ''
			}
			
			const store = this.store( prefix )
			const text = store.for( suffix ).to( 'text' )
			
			this.value( key )
			
			if( next ) {
				this.selection_range( key, next.map( offset => text.point_by_offset( offset ) ) )
				return next
			} else {
				return this.selection_range( key ).map( point => text.offset_by_point( point ) )
			}
			
		}
		
		@ $mol_mem_key
		selection_range<
			Key extends keyof $mol_store_shared_data
		>( key: Key, next?: number[][] ) {
			return next ?? [ [0,0], [0,0] ]
		}
		
		@ $mol_mem_key
		sub<
			Key extends string ,
			Lens extends $mol_store< any > = $mol_store< $mol_store_shared_data >
		>( key : Key , lens? : Lens ) {
			const lens2 = super.sub( key, lens )
			
			lens2.sub = ( prefix, lens )=> {
				const lens3 = this.sub( key ? key + '/' + prefix : String( prefix ), lens )
				lens3.data_default = lens2!.data_default && lens2!.data_default[ prefix ] || lens3.data_default
				return lens3
			}
			
			lens2.value = ( suffix, next )=> {
				return this.value( key ? key + '/' + suffix : String( suffix ), next )
				?? ( lens2!.data_default && lens2!.data_default[ suffix ] )
			}
			
			lens2.selection = ( suffix, next )=> {
				return this.selection( key ? key + '/' + suffix : String( suffix ), next )
			}
			
			return lens2!
		}
		
		server() {
			// return $mol_dom_context.document.location.origin.replace( /^\w+:/ , 'ws:' )
			return `wss://sync-hyoo-ru.herokuapp.com/`
		}
		
		@ $mol_mem
		heartbeat() {
			
			const timer = this.$.setInterval( ()=> {
				this.socket().send('')
			}, 30000 )
			
			return {
				destructor: ()=> clearInterval( timer )
			}
			
		}
		
		@ $mol_mem
		socket() {
			
			this.heartbeat()
			
			const atom = $mol_atom2.current!
			const socket = new $mol_dom_context.WebSocket( this.server() )
			
			socket.onmessage = $mol_fiber.func( event => {

				const message = JSON.parse( event.data )
				
				if( !Array.isArray( message ) ) return
				
				const [ prefix, delta ] = message
				if( typeof prefix !== 'string' ) return
				if( !delta ) return 
				
				const store = this.store( prefix )
				store.apply( delta )
				
				this.$.$mol_store_local.value( prefix, store.delta() )
				this.version_last( prefix, store.clock.version_max )

			} )

			socket.onclose = $mol_fiber.func( ()=> {
				new this.$.$mol_after_timeout( 5000, atom.fresh )
			} )
			
			return socket
		}
		
		@ $mol_fiber.method
		send( key: string, next?: any ) {
			const socket = this.socket()
			if( socket.readyState === socket.CONNECTING ) {
				$mol_fiber_sync( ()=> new Promise( done => {
					socket.addEventListener( 'open', done )
				} ) )()
			}
			const message = next === undefined ? [ key ] : [ key, next ]
			socket.send( JSON.stringify( message ) )
		}
		
	}
	
}
