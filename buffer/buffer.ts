namespace $ {
	export class $mol_buffer extends DataView< ArrayBuffer > {
		
		[ Symbol.toStringTag ] = this.constructor.name + '<>'
		
		static from<
			This extends typeof $mol_buffer
		>(
			this: This,
			array: number | string | ArrayBufferView< ArrayBuffer > | ArrayBuffer,
		) {
			if( typeof array === 'number' ) array = new Uint8Array( array )
			if( typeof array === 'string' ) array = $mol_base64_ae_decode( array )
			if( !ArrayBuffer.isView( array ) ) array = new Uint8Array( array )
			return new this( array.buffer, array.byteOffset, array.byteLength ) as InstanceType< This >
		}
		
		static toString() {
			return $$.$mol_func_name( this )
		}

		getUint48( offset: number, LE = false ) {
			if( offset % 4 ) {
				return this.getUint16( offset, LE ) + this.getUint32( offset + 2, LE ) * 2**16
			} else {
				return this.getUint32( offset, LE ) + this.getUint16( offset + 4, LE ) * 2**32
			}
		}
		
		setUint48( offset: number, value: number, LE = false ) {
			if( offset % 4 ) {
				this.setUint16( offset, value & ( (1<<16) - 1 ), LE )
				this.setUint32( offset + 2, ( value / 2**16 )|0, LE )
			} else {
				this.setUint32( offset, value |0, LE )
				this.setUint16( offset + 4, ( value / 2**32 )|0, LE )
			}
		}
		
		/** 1-byte signed integer channel for offset. */
		int8( offset: number, next?: number ) {
			if( next === undefined ) return this.getInt8( offset )
			if( next >= -(2**7) && next < 2**7 ) return this.setInt8( offset, next ), next
			$mol_fail( new Error( `Wrong int8 value ${ next }` ) )
		}
		
		/** 1-byte unsigned integer channel for offset. */
		uint8( offset: number, next?: number ) {
			if( next === undefined ) return this.getUint8( offset )
			if( next >= 0 && next < 2**8 ) return this.setUint8( offset, next ), next
			$mol_fail( new Error( `Wrong uint8 value ${ next }` ) )
		}
		
		/** 2-byte signed integer little-endian channel for offset. */
		int16( offset: number, next?: number ) {
			if( next === undefined ) return this.getInt16( offset, true )
			if( next >= -(2**15) && next < 2**15 ) return this.setInt16( offset, next, true ), next
			$mol_fail( new Error( `Wrong int16 value ${ next }` ) )
		}
		
		/** 2-byte unsigned integer little-endian channel for offset. */
		uint16( offset: number, next?: number ) {
			if( next === undefined ) return this.getUint16( offset, true )
			if( next >= 0 && next < 2**16 ) return this.setUint16( offset, next, true ), next
			$mol_fail( new Error( `Wrong uint16 value ${ next }` ) )
		}
		
		/** 4-byte signed integer little-endian channel for offset. */
		int32( offset: number, next?: number ) {
			if( next === undefined ) return this.getInt32( offset, true )
			if( next >= -(2**31) && next < 2**31 ) return this.setInt32( offset, next, true ), next
			$mol_fail( new Error( `Wrong int32 value ${ next }` ) )
		}
	
		/** 4-byte unsigned integer little-endian channel for offset. */
		uint32( offset: number, next?: number ) {
			if( next === undefined ) return this.getUint32( offset, true )
			if( next >= 0 && next < 2**32 ) return this.setUint32( offset, next, true ), next
			$mol_fail( new Error( `Wrong uint32 value ${ next }` ) )
		}
		
		/** 8-byte signed integer little-endian channel for offset. */
		int64( offset: number, next?: bigint ) {
			if( next === undefined ) return this.getBigInt64( offset, true )
			if( next >= -(2n**63n) && next < 2n**63n ) return this.setBigInt64( offset, next, true ), next
			$mol_fail( new Error( `Wrong int64 value ${ next }` ) )
		}
		
		/** 6-byte unsigned integer little-endian channel for offset. */
		uint48( offset: number, next?: number ) {
			if( next === undefined ) return this.getUint48( offset, true )
			if( next >= 0 && next < 2**48 ) return this.setUint48( offset, next, true ), next
			$mol_fail( new Error( `Wrong uint48 value ${ next }` ) )
		}
		
		/** 8-byte unsigned integer little-endian channel for offset. */
		uint64( offset: number, next?: bigint ) {
			if( next === undefined ) return this.getBigUint64( offset, true )
			if( next >= 0n && next < 2n**64n ) return this.setBigUint64( offset, next, true ), next
			$mol_fail( new Error( `Wrong uint64 value ${ next }` ) )
		}
		
		/** 2-byte float little-endian channel for offset. */
		float16( offset: number, next?: number ) {
			if( next !== undefined ) this.setFloat16( offset, next, true )
			return this.getFloat16( offset, true )
		}
		
		/** 4-byte float little-endian channel for offset. */
		float32( offset: number, next?: number ) {
			if( next !== undefined ) this.setFloat32( offset, next, true )
			return this.getFloat32( offset, true )
		}
		
		/** 8-byte float little-endian channel for offset. */
		float64( offset: number, next?: number ) {
			if( next !== undefined ) this.setFloat64( offset, next, true )
			return this.getFloat64( offset, true )
		}
		
		/** A Uint8Array view for the same buffer. */
		asArray() {
			return new Uint8Array( this.buffer, this.byteOffset, this.byteLength )
		}
		
		/** base64ae string from buffer. */
		toString() {
			return $mol_base64_ae_encode( this.asArray() )
		}
		
	}
}
