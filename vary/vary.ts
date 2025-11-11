namespace $ {
	
	export enum $mol_vary_tip {
		uint = 0b000 << 5,
		link = 0b001 << 5,
		spec = 0b010 << 5,
		list = 0b011 << 5,
		text = 0b100 << 5,
		blob = 0b101 << 5,
		tupl = 0b110 << 5,
		sint = 0b111 << 5,
	}
	
	export const $mol_vary_len = {
		1: 28,
		2: 29,
		4: 30,
		8: 31,
	} as const
	
	export enum $mol_vary_spec {
		none = 'N'.charCodeAt(0),
		true = 'T'.charCodeAt(0),
		fake = 'F'.charCodeAt(0),
		both = 'B'.charCodeAt(0),
		fp16 = $mol_vary_tip.spec | 29,
		fp32 = $mol_vary_tip.spec | 30,
		fp64 = $mol_vary_tip.spec | 31,
	}
	
	let buffer = new Uint8Array( 256 )
	let pack = new DataView( buffer.buffer )
	
	/** VaryPack - simple fast compact data binarization format. */
	export class $mol_vary extends DataView< ArrayBuffer > {
		
		/** Packs any data to Uint8Array with deduplication. */
		static pack( data: unknown ) {
			
			let pos = 0
			let capacity = 0
			const offsets = new Map< unknown, number >()
			
			const acquire = ( size: number )=> {
				if( size < 0 ) return
				capacity += size
				if( buffer.byteLength >= capacity ) return
				const buffer2 = new Uint8Array( Math.ceil( capacity / 4096 ) * 4096 )
				buffer2.set( buffer )
				buffer = buffer2
				pack = new DataView( buffer.buffer )
			}
			
			const release = ( size: number )=> {
				capacity -= size
			}
			
			const dump_snum = ( val: number | bigint )=> {
				if( val >= -28 ) {
					buffer[ pos ++ ] = Number( val )
					release(8)
				} else if( val >= -(2**7) ) {
					buffer[ pos ++ ] = ~$mol_vary_len[1]
					buffer[ pos ++ ] = Number( val )
					release(7)
				} else if( val >= -(2**15) ) {
					buffer[ pos ++ ] = ~$mol_vary_len[2]
					pack.setInt16( pos, Number( val ), true )
					pos += 2
					release(6)
				} else if( val >= -(2**31) ) {
					buffer[ pos ++ ] = ~$mol_vary_len[4]
					pack.setInt32( pos, Number( val ), true )
					pos += 4
					release(4)
				} else if( val >= -(2n**63n) ) {
					buffer[ pos ++ ] = ~$mol_vary_len[8]
					pack.setBigInt64( pos, BigInt( val ), true )
					pos += 8
				} else {
					$mol_fail( new Error( 'Number too low', { cause: val } ) )
				}
			}
			
			const dump_unum = ( tip: number, val: number | bigint )=> {
				if( val < 28 ) {
					buffer[ pos ++ ] = tip | Number( val )
					release(8)
				} else if( val < 2**8 ) {
					buffer[ pos ++ ] = tip | $mol_vary_len[1]
					buffer[ pos ++ ] = Number( val )
					release(7)
				} else if( val < 2**16 ) {
					buffer[ pos ++ ] = tip | $mol_vary_len[2]
					pack.setUint16( pos, Number( val ), true )
					pos += 2
					release(6)
				} else if( val < 2**32 ) {
					buffer[ pos ++ ] = tip | $mol_vary_len[4]
					pack.setUint32( pos, Number( val ), true )
					pos += 4
					release(4)
				} else if( val < 2n**64n ) {
					buffer[ pos ++ ] = tip | $mol_vary_len[8]
					pack.setBigUint64( pos, BigInt( val ), true )
					pos += 8
				} else {
					$mol_fail( new Error( 'Number too high', { cause: val } ) )
				}
			}
			
			const dump_string = ( val: string )=> {
				
				if( val.length ) {
					const offset = offsets.get( val )
					if( offset !== undefined ) return dump_unum( $mol_vary_tip.link, offset )
				}
				
				dump_unum( $mol_vary_tip.text, val.length )
				acquire( val.length * 3 )
				const len = $mol_charset_encode_to( val, buffer, pos )
				pos += len
				release( val.length * 3 - len )
				
				if( val.length ) offsets.set( val, offsets.size )
				return
			
			}
			
			const dump_buffer = ( val: ArrayBufferView< ArrayBuffer > )=> {
				
				if( val.byteLength ) {
					const offset = offsets.get( val )
					if( offset !== undefined ) return dump_unum( $mol_vary_tip.link, offset )
				}
				
				dump_unum( $mol_vary_tip.blob, val.byteLength )
				
				if( val instanceof Uint8Array ) buffer[ pos ++ ] = $mol_vary_tip.uint | $mol_vary_len[1]
				else if( val instanceof Uint16Array ) buffer[ pos ++ ] = $mol_vary_tip.uint | $mol_vary_len[2]
				else if( val instanceof Uint32Array ) buffer[ pos ++ ] = $mol_vary_tip.uint | $mol_vary_len[4]
				else if( val instanceof BigUint64Array ) buffer[ pos ++ ] = $mol_vary_tip.uint | $mol_vary_len[8]
				
				else if( val instanceof Int8Array ) buffer[ pos ++ ] = $mol_vary_tip.sint | ~$mol_vary_len[1]
				else if( val instanceof Int16Array ) buffer[ pos ++ ] = $mol_vary_tip.sint | ~$mol_vary_len[2]
				else if( val instanceof Int32Array ) buffer[ pos ++ ] = $mol_vary_tip.sint | ~$mol_vary_len[4]
				else if( val instanceof BigInt64Array ) buffer[ pos ++ ] = $mol_vary_tip.sint | ~$mol_vary_len[8]
				
				// else if( val instanceof Float16Array ) pos += pack.tlen( pos, 'spec', $mol_vary_spec.fp16 ) // compatibility issues
				else if( val instanceof Float32Array ) buffer[ pos ++ ] = $mol_vary_spec.fp32
				else if( val instanceof Float64Array ) buffer[ pos ++ ] = $mol_vary_spec.fp64
			
				else $mol_fail( new Error( `Unsupported type` ) )
				
				const src = ( val instanceof Uint8Array ) ? val : new Uint8Array( val.buffer, val.byteOffset, val.byteLength )
				acquire( val.byteLength )
				buffer.set( src, pos )
				pos += val.byteLength
					
				if( val.byteLength ) offsets.set( val, offsets.size )
			}
			
			const dump_list = ( val: any[] )=> {
				
				if( val.length ) {
					const offset = offsets.get( val )
					if( offset !== undefined ) return dump_unum( $mol_vary_tip.link, offset )
				}
			
				dump_unum( $mol_vary_tip.list, val.length )
				acquire( val.length * 9 )
				for( const item of val ) dump( item )
			
				if( val.length ) offsets.set( val, offsets.size )
				
			}
			
			const dump_object = ( val: object )=> {
				
				const offset = offsets.get( val )
				if( offset !== undefined ) return dump_unum( $mol_vary_tip.link, offset )
				
				const proto = Reflect.getPrototypeOf( val )!
				const lean = this.leanes.get( proto )
				
				const keys = lean ? this.keys.get( proto )! : Object.keys( val )
				const vals = lean ? lean( val ) : Object.values( val )
			
				dump_unum( $mol_vary_tip.tupl, vals.length )
				acquire( vals.length * 2 * 9 )
				for( const item of keys ) dump( item )
				for( const item of vals ) dump( item )
				
				if( vals.length ) offsets.set( val, offsets.size )
			}
			
			/** Recursive fills buffer with data. */
			const dump = ( val: unknown )=> {
				
				// if( pos >= size ) $mol_fail( new Error( 'Wrong buffer length', { cause: buffer } ) )
				
				switch( typeof val ) {
					
					case 'undefined': {
						buffer[ pos ++ ] = $mol_vary_spec.both
						release( 8 )
						return
					}
					
					case 'boolean': {
						buffer[ pos ++ ] = val ? $mol_vary_spec.true : $mol_vary_spec.fake
						release( 8 )
						return
					}
					
					case 'number': {
						if( !Number.isInteger( val ) ) {
							buffer[ pos ++ ] = $mol_vary_spec.fp64
							pack.setFloat64( pos, val, true )
							pos += 8
							return
						}
					}
					case 'bigint': {
						
						if( val < 0 ) {
							dump_snum( val )
						} else {
							dump_unum( $mol_vary_tip.uint, val )
						}
						
						return
					}
					
					case 'string': return dump_string( val )
					
					case 'object': {
						
						if( !val ) {
							release( 8 )
							return buffer[ pos ++ ] = $mol_vary_spec.none
						}
						if( ArrayBuffer.isView( val ) ) return dump_buffer( val as ArrayBufferView< ArrayBuffer > )
						if( Array.isArray( val ) ) return dump_list( val )
						
						return dump_object( val )
						
					}
					
				}
				
				$mol_fail( new Error( `Unsupported type` ) )
			}
			
			dump( data )
			
			return buffer.slice( 0, pos )
			
		}
		
		/** Parses buffer to rich runtime structures. */
		static take( buf: Uint8Array< ArrayBuffer > ): unknown {
			
			const pack = new $mol_vary( buf.buffer, buf.byteOffset, buf.byteLength )
			const stream = [] as unknown[]
			let pos = 0;
			
			const read_unum = ( kind: number )=> {
				
				++ pos
				const num = kind & 0b11111
				if( num < 28 ) return num
				
				let res = 0 as number | bigint
				
				if( num === 28 ) {
					res = buffer[ pos ++ ]
				} else if( num === 29 ) {
					res = pack.getUint16( pos, true )
					pos += 2
				} else if( num === 30 ) {
					res = pack.getUint32( pos, true )
					pos += 4
				} else if( num === 31 ) {
					res = pack.getBigUint64( pos, true )
					if( res <= Number.MAX_SAFE_INTEGER ) res = Number( res )
					pos += 8
				} else {
					$mol_fail( new Error( 'Unsupported unum', { cause: { num } } ) )
				}
				
				return res
			}
			
			const read_snum = ( kind: number )=> {
				
				const num = pack.getInt8( pos ++ )
				if( num >= -28 ) return num
				
				let res = 0 as number | bigint
				
				if( num === -29 ) {
					res = pack.getInt8( pos )
					pos += 1
				} else if( num === -30 ) {
					res= pack.getInt16( pos, true )
					pos += 2
				} else if( num === -31 ) {
					res = pack.getInt32( pos, true )
					pos += 4
				} else if( num === -32 ) {
					res = pack.getBigInt64( pos, true )
					if( res >= Number.MIN_SAFE_INTEGER && res <= Number.MAX_SAFE_INTEGER ) res = Number( res )
					pos += 8
				} else {
					$mol_fail( new Error( 'Unsupported snum', { cause: { num } } ) )
				}
				
				return res
			}
			
			const read_text = ( kind: number )=> {
				const len = read_unum( kind ) as number
				const [ text, bytes ] = $mol_charset_decode_from( buf, pack.byteOffset + pos, len )
				pos += bytes
				if( text.length ) stream.push( text )
				return text
			}
			
			const read_buffer = ( len: number, TypedArray: new( buf: ArrayBuffer )=> ArrayBufferView< ArrayBuffer > )=> {
				const bin = new TypedArray( buf.slice( pos, pos + len ).buffer )
				pos += len
				if( len ) stream.push( bin )
				return bin
			}
			
			const read_blob = ( kind: number )=> {
				
				const len = read_unum( kind ) as number
				const kind_item = buffer[ pos ++ ]
				
				switch( kind_item ) {
					
					case $mol_vary_len[1]: return read_buffer( len, Uint8Array )
					case $mol_vary_len[2]: return read_buffer( len, Uint16Array )
					case $mol_vary_len[4]: return read_buffer( len, Uint32Array )
					case $mol_vary_len[8]: return read_buffer( len, BigUint64Array )
					
					case ~$mol_vary_len[1] + 256: return read_buffer( len, Int8Array )
					case ~$mol_vary_len[2] + 256: return read_buffer( len, Int16Array )
					case ~$mol_vary_len[4] + 256: return read_buffer( len, Int32Array )
					case ~$mol_vary_len[8] + 256: return read_buffer( len, BigInt64Array )
					
					case $mol_vary_tip.spec | $mol_vary_spec.fp16: return read_buffer( len, Float16Array )
					case $mol_vary_tip.spec | $mol_vary_spec.fp32: return read_buffer( len, Float32Array )
					case $mol_vary_tip.spec | $mol_vary_spec.fp64: return read_buffer( len, Float64Array )
					
					default:
						$mol_fail( new Error( 'Unsupported blob item kind', { cause: { kind_item } } ) )
				}
				
			}
			
			const read_list = ( kind: number )=> {
				const len = read_unum( kind ) as number
				const list = new Array( len ) as any[]
				for( let i = 0; i < len; ++i ) list[i] = read_vary()
				if( len ) stream.push( list )
				return list
			}
			
			const read_link = ( kind: number )=> {
				const index = read_unum( kind ) as number
				if( index >= stream.length ) $mol_fail( new Error( 'Too large index', { cause: { index, exists: stream.length } } ) )
				return stream[ index ]
			}
			
			const read_tupl = ( kind: number )=> {
				
				const len = read_unum( kind ) as number
				
				const keys = new Array( len ) as any[]
				const vals = new Array( len ) as any[]
				
				for( let i = 0; i < len; ++i ) keys[i] = read_vary()
				for( let i = 0; i < len; ++i ) vals[i] = read_vary()
				
				const shape = JSON.stringify( keys )
				
				let obj
				const rich = this.riches.get( shape )
				if( rich ) {
					obj = rich( ... vals )
				} else {
					obj = {} as any
					for( let i = 0; i < len; ++i ) obj[ keys[i] ] = vals[i]
				}
				
				if( vals.length ) stream.push( obj )
				
				return obj
			}
			
			const read_spec = ( kind: number )=> {
				
				switch( kind ) {
					
					case $mol_vary_spec.none:
						++ pos
						return null
					
					case $mol_vary_spec.fake:
						++ pos
						return false
					
					case $mol_vary_spec.true:
						++ pos
						return true
					
					case $mol_vary_spec.both:
						++ pos
						return undefined
					
					case $mol_vary_spec.fp64: {
						const val = pack.getFloat64( ++ pos, true )
						pos += 8
						return val
					}
					
					case $mol_vary_spec.fp32: {
						const val = pack.getFloat32( ++ pos, true )
						pos += 4
						return val
					}
					
					case $mol_vary_spec.fp16: {
						const val = pack.getFloat16( ++ pos, true )
						pos += 2
						return val
					}
					
					default:
						$mol_fail( new Error( 'Unsupported spec', { cause: { kind } } ) )
					
				}
				
			}
			
			const read_vary = ()=> {
				
				const kind = buffer[ pos ]
				const tip = kind & 0b111_00000
				
				switch( tip ) {
					
					case $mol_vary_tip.uint: return read_unum( kind )
					case $mol_vary_tip.sint: return read_snum( kind )
					case $mol_vary_tip.link: return read_link( kind )
					case $mol_vary_tip.text: return read_text( kind )
					case $mol_vary_tip.list: return read_list( kind )
					case $mol_vary_tip.blob: return read_blob( kind )
					case $mol_vary_tip.tupl: return read_tupl( kind )
					case $mol_vary_tip.spec: return read_spec( kind )
					
					default: $mol_fail( new Error( 'Unsupported tip', { cause: { tip } } ) )
				}
				
			}
			
			return read_vary()
		}
		
		static leanes = new Map< object, ( val: any )=> readonly any[] >()
		static keys = new Map< object, readonly string[] >()
		static riches = new Map< string/*shape*/, ( ... vals: readonly any[] )=> object >()
		
		/** Adds custom types support. */
		static type<
			const Instance extends object,
			const Keys extends readonly any[],
			const Vals extends readonly any[],
		>(
			keys: Keys,
			rich: ( ( ... vals: Vals )=> Instance ) | ( ()=> Instance ),
			lean: ( obj: Instance )=> Vals,
		) {
			
			const obj = rich()
			const proto = Reflect.getPrototypeOf( obj )!
			const shape = JSON.stringify( keys )
			
			this.leanes.set( proto, lean )
			this.keys.set( proto, keys )
			this.riches.set( shape, rich )
		}
		
	}
	
	/** Native Map support */
	$mol_vary.type(
		[ 'keys', 'vals' ],
		( keys = [] as readonly any[], vals = [] as readonly any[] )=> new Map( keys.map( ( k, i )=> [ k, vals[i] ] ) ),
		obj => [ [ ... obj.keys() ], [ ... obj.values() ] ],
	)
	
	/** Native Set support */
	$mol_vary.type(
		[ 'set' ],
		( vals = [] as readonly any[] )=> new Set( vals ),
		obj => [ [ ... obj.values() ] ],
	)
	
	/** Native Date support */
	$mol_vary.type(
		[ 'unix_time' ],
		( ts = 0 )=> new Date( ts * 1000 ),
		obj => [ obj.valueOf() / 1000 ],
	)
	
}
