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
	
	export enum $mol_vary_len {
		L1 = 28,
		L2 = 29,
		L4 = 30,
		L8 = 31,
		LA = 32,
	}
	
	export enum $mol_vary_spec {
		none = 'N'.charCodeAt(0),
		true = 'T'.charCodeAt(0),
		fake = 'F'.charCodeAt(0),
		both = 'B'.charCodeAt(0),
		fp16 = $mol_vary_tip.spec | $mol_vary_len.L2,
		fp32 = $mol_vary_tip.spec | $mol_vary_len.L4,
		fp64 = $mol_vary_tip.spec | $mol_vary_len.L8,
	}
	
	let buffer = new Uint8Array( 256 )
	let pack = new DataView( buffer.buffer )
	
	/** VaryPack - simple fast compact data binarization format. */
	export class $mol_vary extends Object {
		
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
			
			const dump_unum = ( tip: number, val: number | bigint )=> {
				
				if( val < $mol_vary_len.L1 ) {
					buffer[ pos ++ ] = tip | Number( val )
					release(8)
					return
				}
				
				if( tip == $mol_vary_tip.uint ) {
					const offset = offsets.get( val )
					if( offset !== undefined ) return dump_unum( $mol_vary_tip.link, offset )
				}
				
				if( val < 2**8 ) {
					buffer[ pos ++ ] = tip | $mol_vary_len.L1
					buffer[ pos ++ ] = Number( val )
					release(7)
				} else if( val < 2**16 ) {
					buffer[ pos ++ ] = tip | $mol_vary_len.L2
					pack.setUint16( pos, Number( val ), true )
					pos += 2
					release(6)
				} else if( val < 2**32 ) {
					buffer[ pos ++ ] = tip | $mol_vary_len.L4
					pack.setUint32( pos, Number( val ), true )
					pos += 4
					release(4)
				} else if( val < 2n**64n ) {
					buffer[ pos ++ ] = tip | $mol_vary_len.L8
					pack.setBigUint64( pos, BigInt( val ), true )
					pos += 8
				} else {
					dump_bint( val as bigint )
				}
				
				if( tip == $mol_vary_tip.uint ) offsets.set( val, offsets.size )
				
			}
			
			const dump_snum = ( val: number | bigint )=> {
				
				if( val > - $mol_vary_len.L1 ) {
					buffer[ pos ++ ] = Number( val )
					release(8)
					return 
				}
				
				const offset = offsets.get( val )
				if( offset !== undefined ) return dump_unum( $mol_vary_tip.link, offset )
				
				if( val >= -(2**7) ) {
					buffer[ pos ++ ] = - $mol_vary_len.L1
					buffer[ pos ++ ] = Number( val )
					release(7)
				} else if( val >= -(2**15) ) {
					buffer[ pos ++ ] =  -$mol_vary_len.L2
					pack.setInt16( pos, Number( val ), true )
					pos += 2
					release(6)
				} else if( val >= -(2**31) ) {
					buffer[ pos ++ ] = - $mol_vary_len.L4
					pack.setInt32( pos, Number( val ), true )
					pos += 4
					release(4)
				} else if( val >= -(2n**63n) ) {
					buffer[ pos ++ ] = - $mol_vary_len.L8
					pack.setBigInt64( pos, BigInt( val ), true )
					pos += 8
				} else {
					dump_bint( val as bigint )
				}
				
				offsets.set( val, offsets.size )
				
			}
			
			const dump_bint = ( val: bigint )=> {
				
				const buf = $mol_bigint_encode( val as bigint )
				
				if( buf.byteLength > 264 ) $mol_fail( new Error( 'Number too high', { cause: { val } } ) )
				acquire( buf.byteLength - 7 )
				
				buffer[ pos ++ ] = - $mol_vary_len.LA
				buffer[ pos ++ ] = buf.byteLength - 9
				
				buffer.set( buf, pos )
				pos += buf.byteLength
				
			}
			
			const dump_float = ( val: number )=> {
				
				const offset = offsets.get( val )
				if( offset !== undefined ) return dump_unum( $mol_vary_tip.link, offset )
					
				buffer[ pos ++ ] = $mol_vary_spec.fp64
				pack.setFloat64( pos, val, true )
				pos += 8
				
				offsets.set( val, offsets.size )
			}
			
			const dump_string = ( val: string )=> {
				
				const offset = offsets.get( val )
				if( offset !== undefined ) return dump_unum( $mol_vary_tip.link, offset )
				
				dump_unum( $mol_vary_tip.text, val.length )
				acquire( val.length * 3 )
				const len = $mol_charset_encode_to( val, buffer, pos )
				pos += len
				release( val.length * 3 - len )
				
				offsets.set( val, offsets.size )
				return
			
			}
			
			const dump_buffer = ( val: ArrayBufferView< ArrayBuffer > )=> {
				
				const offset = offsets.get( val )
				if( offset !== undefined ) return dump_unum( $mol_vary_tip.link, offset )
				
				dump_unum( $mol_vary_tip.blob, val.byteLength )
				
				if( val instanceof Uint8Array ) buffer[ pos ++ ] = $mol_vary_tip.uint | $mol_vary_len.L1
				else if( val instanceof Uint16Array ) buffer[ pos ++ ] = $mol_vary_tip.uint | $mol_vary_len.L2
				else if( val instanceof Uint32Array ) buffer[ pos ++ ] = $mol_vary_tip.uint | $mol_vary_len.L4
				else if( val instanceof BigUint64Array ) buffer[ pos ++ ] = $mol_vary_tip.uint | $mol_vary_len.L8
				
				else if( val instanceof Int8Array ) buffer[ pos ++ ] = $mol_vary_tip.sint | ~$mol_vary_len.L1
				else if( val instanceof Int16Array ) buffer[ pos ++ ] = $mol_vary_tip.sint | ~$mol_vary_len.L2
				else if( val instanceof Int32Array ) buffer[ pos ++ ] = $mol_vary_tip.sint | ~$mol_vary_len.L4
				else if( val instanceof BigInt64Array ) buffer[ pos ++ ] = $mol_vary_tip.sint | ~$mol_vary_len.L8
				
				else if( typeof Float16Array === 'function' && val instanceof Float16Array ) buffer[ pos ++ ] = $mol_vary_spec.fp16
				else if( val instanceof Float32Array ) buffer[ pos ++ ] = $mol_vary_spec.fp32
				else if( val instanceof Float64Array ) buffer[ pos ++ ] = $mol_vary_spec.fp64
			
				else $mol_fail( new Error( `Unsupported type` ) )
				
				const src = ( val instanceof Uint8Array ) ? val : new Uint8Array( val.buffer, val.byteOffset, val.byteLength )
				acquire( val.byteLength )
				buffer.set( src, pos )
				pos += val.byteLength
				
				offsets.set( val, offsets.size )
			}
			
			const dump_list = ( val: any[] )=> {
				
				const offset = offsets.get( val )
				if( offset !== undefined ) return dump_unum( $mol_vary_tip.link, offset )
			
				dump_unum( $mol_vary_tip.list, val.length )
				acquire( val.length * 9 )
				for( const item of val ) dump( item )
			
				offsets.set( val, offsets.size )
				
			}
			
			const dump_object = ( val: object )=> {
				
				const offset = offsets.get( val )
				if( offset !== undefined ) return dump_unum( $mol_vary_tip.link, offset )
				
				const keys = ( val as any )[ $mol_vary_keys ] ?? Object.keys( val )
				const vals = ( val as any )[ $mol_vary_lean ]?.( val ) ?? Object.values( val )
			
				dump_unum( $mol_vary_tip.tupl, vals.length )
				acquire( vals.length * 2 * 9 )
				for( const item of keys ) dump( item )
				for( const item of vals ) dump( item )
				
				offsets.set( val, offsets.size )
			}
			
			/** Recursive fills buffer with data. */
			const dump = ( val: unknown )=> {
				
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
						if( !Number.isInteger( val ) ) return dump_float( val )
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
		static take( buffer: Uint8Array< ArrayBuffer > ): unknown {
			
			const pack = new DataView( buffer.buffer, buffer.byteOffset, buffer.byteLength )
			const stream = [] as unknown[]
			let pos = 0;
			
			const read_unum = ( kind: number )=> {
				
				++ pos
				const num = kind & 0b11111
				if( num < $mol_vary_len.L1 ) return num
				
				let res = 0 as number | bigint
				
				if( num === $mol_vary_len.L1 ) {
					res = pack.getUint8( pos ++ )
				} else if( num === $mol_vary_len.L2 ) {
					res = pack.getUint16( pos, true )
					pos += 2
				} else if( num === $mol_vary_len.L4 ) {
					res = pack.getUint32( pos, true )
					pos += 4
				} else if( num === $mol_vary_len.L8 ) {
					res = pack.getBigUint64( pos, true )
					if( res <= Number.MAX_SAFE_INTEGER ) res = Number( res )
					pos += 8
				} else {
					$mol_fail( new Error( 'Unsupported unum', { cause: { num } } ) )
				}
				
				if( ( kind & 0b111_00000 ) === $mol_vary_tip.uint ) stream.push( res )
				
				return res
			}
			
			const read_snum = ( kind: number )=> {
				
				const num = pack.getInt8( pos ++ )
				if( num > - $mol_vary_len.L1 ) return num
				
				let res = 0 as number | bigint
				
				if( num === - $mol_vary_len.L1 ) {
					res = pack.getInt8( pos ++ )
				} else if( num === - $mol_vary_len.L2 ) {
					res= pack.getInt16( pos, true )
					pos += 2
				} else if( num === - $mol_vary_len.L4 ) {
					res = pack.getInt32( pos, true )
					pos += 4
				} else if( num === - $mol_vary_len.L8 ) {
					res = pack.getBigInt64( pos, true )
					if( res >= Number.MIN_SAFE_INTEGER && res <= Number.MAX_SAFE_INTEGER ) res = Number( res )
					pos += 8
				} else if( num === - $mol_vary_len.LA ) {
					const len = pack.getUint8( pos ++ ) + 9
					res = $mol_bigint_decode( new Uint8Array( pack.buffer, pack.byteOffset + pos, len ) )
					pos += len
				} else {
					$mol_fail( new Error( 'Unsupported snum', { cause: { num } } ) )
				}
				
				stream.push( res )
				
				return res
			}
			
			const read_text = ( kind: number )=> {
				const len = read_unum( kind ) as number
				const [ text, bytes ] = $mol_charset_decode_from( buffer, pack.byteOffset + pos, len )
				pos += bytes
				stream.push( text )
				return text
			}
			
			const read_buffer = ( len: number, TypedArray: new( buf: ArrayBuffer )=> ArrayBufferView< ArrayBuffer > )=> {
				const bin = new TypedArray( buffer.slice( pos, pos + len ).buffer )
				pos += len
				stream.push( bin )
				return bin
			}
			
			const read_blob = ( kind: number )=> {
				
				const len = read_unum( kind ) as number
				const kind_item = pack.getUint8( pos ++ )
				
				switch( kind_item ) {
					
					case $mol_vary_len.L1: return read_buffer( len, Uint8Array )
					case $mol_vary_len.L2: return read_buffer( len, Uint16Array )
					case $mol_vary_len.L4: return read_buffer( len, Uint32Array )
					case $mol_vary_len.L8: return read_buffer( len, BigUint64Array )
					
					case ~$mol_vary_len.L1 + 256: return read_buffer( len, Int8Array )
					case ~$mol_vary_len.L2 + 256: return read_buffer( len, Int16Array )
					case ~$mol_vary_len.L4 + 256: return read_buffer( len, Int32Array )
					case ~$mol_vary_len.L8 + 256: return read_buffer( len, BigInt64Array )
					
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
				stream.push( list )
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
				
				stream.push( obj )
				
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
						stream.push( val )
						pos += 8
						return val
					}
					
					case $mol_vary_spec.fp32: {
						const val = pack.getFloat32( ++ pos, true )
						stream.push( val )
						pos += 4
						return val
					}
					
					case $mol_vary_spec.fp16: {
						const val = pack.getFloat16( ++ pos, true )
						stream.push( val )
						pos += 2
						return val
					}
					
					default:
						$mol_fail( new Error( 'Unsupported spec', { cause: { kind } } ) )
					
				}
				
			}
			
			const read_vary = ()=> {
				
				const kind = pack.getUint8( pos )
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
			
			const result = read_vary()
			if( pos !== buffer.byteLength ) $mol_fail( new Error( 'Buffer too large', { cause: { size: buffer.byteLength, taken: pos, result } } ) )
			
			return result
		}
		
		static riches = new Map< string/*shape*/, ( ... vals: readonly any[] )=> object >()
		
		/** Adds custom types support. */
		static type<
			const Instance extends object,
			const Keys extends readonly any[],
			const Vals extends readonly any[],
		>(
			Class: new( ... vals: any[] )=> Instance,
			keys: Keys,
			lean: ( obj: Instance )=> Vals,
			rich: ( ... vals: Vals )=> Instance,
		) {
			this.riches.set( JSON.stringify( keys ), rich )
			;( Class.prototype as any )[ $mol_vary_lean ] = lean
			;( Class.prototype as any )[ $mol_vary_keys ] = keys
		}
		
	}
	
	export const $mol_vary_lean = Symbol.for( '$mol_vary_lean' )
	export const $mol_vary_keys = Symbol.for( '$mol_vary_keys' )
	
	/** Native Map support */
	$mol_vary.type(
		Map,
		[ 'keys', 'vals' ],
		obj => [ [ ... obj.keys() ], [ ... obj.values() ] ],
		( keys, vals )=> new Map( keys.map( ( k, i )=> [ k, vals[i] ] ) ),
	)
	
	/** Native Set support */
	$mol_vary.type(
		Set,
		[ 'set' ],
		obj => [ [ ... obj.values() ] ],
		vals => new Set( vals ),
	)
	
	/** Native Date support */
	$mol_vary.type(
		Date,
		[ 'unix_time' ],
		obj => [ obj.valueOf() / 1000 ],
		ts => new Date( ts * 1000 ),
	)
	
	/** Native Element support */
	$mol_vary.type(
		$mol_dom.Element,
		[ 'elem', 'keys', 'vals', 'kids' ],
		node => {
			const attrs = [ ... node.attributes ]
			const kids = [ ... node.childNodes ].map( kid => kid instanceof $mol_dom.Text ? kid.nodeValue! : kid )
			return [ node.nodeName, attrs.map( attr => attr.nodeName ), attrs.map( attr => attr.nodeValue! ), kids ]
		},
		( name, keys, vals, kids )=> {
			const el = $mol_dom.document.createElement( name )
			for( let i = 0; i < keys.length; ++i ) el.setAttribute( keys[i], vals[i] )
			for( let kid of kids ) {
				if( typeof kid === 'string' ) kid = $mol_dom.document.createTextNode( kid )
				el.appendChild( kid )
			}
			return el
		},
	)
	
}
