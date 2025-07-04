namespace $ {
	export class $mol_buffer extends DataView< ArrayBuffer > {
		
		[ Symbol.toStringTag ] = this.constructor.name + '<>'
		
		static from<
			This extends typeof $mol_buffer
		>(
			this: This,
			array: number | string | ArrayBufferView< ArrayBuffer >,
		) {
			if( typeof array === 'number' ) array = new Uint8Array( array )
			if( typeof array === 'string' ) array = $mol_base64_ae_decode( array )
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
		
		int8( offset: number, next?: number ) {
			if( next === undefined ) return this.getInt8( offset )
			if( next >= -(2**7) && next < 2**7 ) return this.setInt8( offset, next ), next
			$mol_fail( new Error( `Wrong int8 value ${ next }` ) )
		}
		
		uint8( offset: number, next?: number ) {
			if( next === undefined ) return this.getUint8( offset )
			if( next >= 0 && next < 2**8 ) return this.setUint8( offset, next ), next
			$mol_fail( new Error( `Wrong uint8 value ${ next }` ) )
		}
		
		int16( offset: number, next?: number ) {
			if( next === undefined ) return this.getInt16( offset, true )
			if( next >= -(2**15) && next < 2**15 ) return this.setInt16( offset, next, true ), next
			$mol_fail( new Error( `Wrong int16 value ${ next }` ) )
		}
		
		uint16( offset: number, next?: number ) {
			if( next === undefined ) return this.getUint16( offset, true )
			if( next >= 0 && next < 2**16 ) return this.setUint16( offset, next, true ), next
			$mol_fail( new Error( `Wrong uint16 value ${ next }` ) )
		}
		
		int32( offset: number, next?: number ) {
			if( next === undefined ) return this.getInt32( offset, true )
			if( next >= -(2**31) && next < 2**31 ) return this.setInt32( offset, next, true ), next
			$mol_fail( new Error( `Wrong int32 value ${ next }` ) )
		}
	
		uint32( offset: number, next?: number ) {
			if( next === undefined ) return this.getUint32( offset, true )
			if( next >= 0 && next < 2**32 ) return this.setUint32( offset, next, true ), next
			$mol_fail( new Error( `Wrong uint32 value ${ next }` ) )
		}
		
		uint48( offset: number, next?: number ) {
			if( next === undefined ) return this.getUint48( offset, true )
			if( next >= 0 && next < 2**48 ) return this.setUint48( offset, next, true ), next
			$mol_fail( new Error( `Wrong uint48 value ${ next }` ) )
		}
		
		int64( offset: number, next?: bigint ) {
			if( next === undefined ) return this.getBigInt64( offset, true )
			if( next >= -(2**63) && next < 2**63 ) return this.setBigInt64( offset, next, true ), next
			$mol_fail( new Error( `Wrong int64 value ${ next }` ) )
		}
		
		uint64( offset: number, next?: bigint ) {
			if( next === undefined ) return this.getBigUint64( offset, true )
			if( next >= 0 && next < 2**64 ) return this.setBigUint64( offset, next, true ), next
			$mol_fail( new Error( `Wrong uint64 value ${ next }` ) )
		}
		
		float32( offset: number, next?: number ) {
			if( next !== undefined ) this.setFloat32( offset, next, true )
			return this.getFloat32( offset, true )
		}
		
		float64( offset: number, next?: number ) {
			if( next !== undefined ) this.setFloat64( offset, next, true )
			return this.getFloat64( offset, true )
		}
		
		asArray() {
			return new Uint8Array( this.buffer, this.byteOffset, this.byteLength )
		}
		
		toString() {
			return $mol_base64_ae_encode( this.asArray() )
		}
		
	}
}
