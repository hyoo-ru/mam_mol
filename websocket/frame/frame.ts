namespace $ {
	
	export enum $mol_websocket_frame_op {
		
		con = 0,
		txt = 1,
		bin = 2,
		
		stop = 8,
		ping = 9,
		pong = 10,
		
	}
	
	/**
	 * WebSocket frame header.
	 * Aren't supported:
	 * - masks
	 * - payload >= 2^32
	 */
	export class $mol_websocket_frame extends $mol_buffer {
		
		kind( next?: {
			op: keyof typeof $mol_websocket_frame_op
			fin: boolean,
		} ) {
			if( next ) {
				
				this.uint8( 0, Number( next.fin ) << 7 | $mol_websocket_frame_op[ next.op ] )
				return next
				
			} else {
				
				const state = this.uint8( 0 )
				const fin = state >> 7
				
				const op = $mol_websocket_frame_op[ state & 0b1111 ] as keyof typeof $mol_websocket_frame_op
				if( op === undefined ) $mol_fail( new Error( `Wrong op (${ state.toString(2) })` ) )
				
				return { op, fin }
				
			}
		}
		
		data( next?: { size: number, mask: boolean } ) {
			if( next === undefined ) {
				
				const state = this.getUint8( 1 )
				const mask = state >> 7
				
				let size = state & 0b0111_1111
				if( size === 126 ) size = this.getUint16( 2 )
				else if( size === 127 ) size = this.getUint32( 2 )
			
				return { size, mask }
			
			} else {
				
				if( next.size >= 2**16 ) {
					
					this.setUint8( 1, 127 | Number( next.mask ) << 7 )
					this.setUint32( 2, next.size )
					
				} else if( next.size >= 126 ) {
					
					this.setUint8( 1, 126 | Number( next.mask ) << 7 )
					this.setUint16( 2, next.size )
					
				} else {
					
					this.setUint8( 1, next.size | Number( next.mask ) << 7 )
					
				}
				
				return next
				
			}
		}
		
		size() {
			const short = this.getUint8( 1 ) & 0b0111_1111
			const mask = this.getUint8( 1 ) >> 7
			return ( short === 127 ? 10 : short === 126 ? 4 : 2 ) + ( mask ? 4 : 0 )
		}
		
		mask() {
			return new Uint8Array( this.buffer, this.size() - 4, 4 )
		}
		
		toString() {
			const { op, fin } = this.kind()
			const { size, mask } = this.data()
			return `${op}${ fin ? '!' : '+' }${ size }${ mask ? '@' : '#' }`
		}
		
		static make(
			op: keyof typeof $mol_websocket_frame_op,
			size = 0,
			mask = false,
			fin = true,
		) {
			
			const head = ( size === 127 ? 10 : size === 126 ? 4 : 2 ) + ( mask ? 4 : 0 )
			const frame = $mol_websocket_frame.from( head )
			
			frame.kind({ op, fin })
			frame.data({ size, mask })
			
			return frame
		}
		
	}
	
}
