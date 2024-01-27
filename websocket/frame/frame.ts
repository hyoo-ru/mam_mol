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
				const op = $mol_websocket_frame_op[ state & 0b1111 ]
				if( op === undefined ) $mol_fail( new Error( `Wrong op (${ state.toString(2) })` ) )
				return { op, fin }
			}
		}
		
		size_data( next?: number ) {
			if( next === undefined ) {
				const short = this.getUint8( 1 ) & 0b0111_1111
				if( short === 126 ) return this.getUint16( 2 )
				if( short === 127 ) return this.getUint32( 2 )
				return short
			} else {
				if( next >= 2**16 ) {
					this.setUint8( 1, 127 )
					this.setUint32( 2, next )
				} else if( next >= 126 ) {
					this.setUint8( 1, 126 )
					this.setUint16( 2, next )
				} else {
					this.setUint8( 1, next )
				}
				return next
			}
		}
		
		size_head() {
			const short = this.getUint8( 1 ) & 0b0111_1111
			return short === 127 ? 10 : short === 126 ? 4 : 2
		}
		
		toString() {
			const { op, fin } = this.kind()
			return `${op}${ fin ? '!' : '+' }${ this.size_data() }`
		}
		
		static make(
			op: keyof typeof $mol_websocket_frame_op,
			size = 0,
			fin = true,
		) {
			
			const head = size === 127 ? 10 : size === 126 ? 4 : 2
			const frame = $mol_websocket_frame.from( head )
			
			frame.kind({ op, fin })
			frame.size_data( size )
			
			return frame
		}
		
	}
	
}
