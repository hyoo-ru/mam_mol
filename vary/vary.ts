namespace $ {
	
	export enum $mol_vary_tip {
		uint = 0b000 << 5,
		link = 0b001 << 5,
		spec = 0b010 << 5,
		list = 0b011 << 5,
		blob = 0b100 << 5,
		text = 0b101 << 5,
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
		fp16 = 'H'.charCodeAt(0),
		fp32 = 'S'.charCodeAt(0),
		fp64 = 'D'.charCodeAt(0),
		f128 = 'Q'.charCodeAt(0),
		f256 = 'O'.charCodeAt(0),
	}
	
	const pojo_maker = ( keys: readonly any[] )=> ( vals: readonly any[] )=> {
		const obj = {} as any
		for( let i = 0; i < keys.length; ++i ) obj[ keys[i] ] = vals[i]
		return obj
	}
	
	/** VaryPack - simple fast compact data binarization format. */
	export class $mol_vary_class extends Object {
		
		lean_symbol = Symbol( '$mol_vary_lean' )
	
		array = new Uint8Array( 256 )
		buffer = new DataView( this.array.buffer )
		
		/** Packs any data to Uint8Array with deduplication. */
		pack( data: readonly unknown[] ) {
			
			let pos = 0
			let capacity = 0
			const offsets = new Map< unknown, number >()
			const stack = [] as any[]
			
			const acquire = ( size: number )=> {
				if( size < 0 ) return
				capacity += size
				if( this.array.byteLength >= capacity ) return
				const buffer2 = new Uint8Array( Math.ceil( capacity / 4096 ) * 4096 )
				buffer2.set( this.array )
				this.array = buffer2
				this.buffer = new DataView( this.array.buffer )
			}
			
			const release = ( size: number )=> {
				capacity -= size
			}
			
			const dump_unum = ( tip: number, val: number | bigint )=> {
				
				if( val < $mol_vary_len.L1 ) {
					this.array[ pos ++ ] = tip | Number( val )
					release(8)
					return
				}
				
				if( tip == $mol_vary_tip.uint ) {
					const offset = offsets.get( val )
					if( offset !== undefined ) return dump_unum( $mol_vary_tip.link, offset )
				}
				
				if( val < 2**8 ) {
					this.array[ pos ++ ] = tip | $mol_vary_len.L1
					this.array[ pos ++ ] = Number( val )
					release(7)
				} else if( val < 2**16 ) {
					this.array[ pos ++ ] = tip | $mol_vary_len.L2
					this.buffer.setUint16( pos, Number( val ), true )
					pos += 2
					release(6)
				} else if( val < 2**32 ) {
					this.array[ pos ++ ] = tip | $mol_vary_len.L4
					this.buffer.setUint32( pos, Number( val ), true )
					pos += 4
					release(4)
				} else if( val < 2n**64n ) {
					this.array[ pos ++ ] = tip | $mol_vary_len.L8
					this.buffer.setBigUint64( pos, BigInt( val ), true )
					pos += 8
				} else {
					dump_bint( val as bigint )
				}
				
				if( tip == $mol_vary_tip.uint ) offsets.set( val, offsets.size )
				
			}
			
			const dump_snum = ( val: number | bigint )=> {
				
				if( val > - $mol_vary_len.L1 ) {
					this.array[ pos ++ ] = Number( val )
					release(8)
					return 
				}
				
				const offset = offsets.get( val )
				if( offset !== undefined ) return dump_unum( $mol_vary_tip.link, offset )
				
				if( val >= -(2**7) ) {
					this.array[ pos ++ ] = - $mol_vary_len.L1
					this.array[ pos ++ ] = Number( val )
					release(7)
				} else if( val >= -(2**15) ) {
					this.array[ pos ++ ] =  -$mol_vary_len.L2
					this.buffer.setInt16( pos, Number( val ), true )
					pos += 2
					release(6)
				} else if( val >= -(2**31) ) {
					this.array[ pos ++ ] = - $mol_vary_len.L4
					this.buffer.setInt32( pos, Number( val ), true )
					pos += 4
					release(4)
				} else if( val >= -(2n**63n) ) {
					this.array[ pos ++ ] = - $mol_vary_len.L8
					this.buffer.setBigInt64( pos, BigInt( val ), true )
					pos += 8
				} else {
					dump_bint( val as bigint )
				}
				
				offsets.set( val, offsets.size )
				
			}
			
			const dump_bint = ( val: bigint )=> {
				
				const buf = $mol_bigint_encode( val as bigint )
				
				if( buf.byteLength > ( 2**16 + 8 ) ) $mol_fail( new Error( 'Number too high', { cause: { val } } ) )
				acquire( buf.byteLength - 6 )
				
				this.array[ pos ++ ] = - $mol_vary_len.LA
				this.buffer.setUint16( pos, buf.byteLength - 9, true )
				pos += 2
				
				this.array.set( buf, pos )
				pos += buf.byteLength
				
			}
			
			const dump_float = ( val: number )=> {
				
				const offset = offsets.get( val )
				if( offset !== undefined ) return dump_unum( $mol_vary_tip.link, offset )
					
				this.array[ pos ++ ] = $mol_vary_spec.fp64
				this.buffer.setFloat64( pos, val, true )
				pos += 8
				
				offsets.set( val, offsets.size )
			}
			
			const dump_string = ( val: string )=> {
				
				const offset = offsets.get( val )
				if( offset !== undefined ) return dump_unum( $mol_vary_tip.link, offset )
				
				dump_unum( $mol_vary_tip.text, val.length )
				acquire( val.length * 3 )
				const len = $mol_charset_encode_to( val, this.array, pos )
				pos += len
				release( val.length * 3 - len )
				
				offsets.set( val, offsets.size )
				return
			
			}
			
			const dump_buffer = ( val: ArrayBufferView< ArrayBuffer > )=> {
				
				const offset = offsets.get( val )
				if( offset !== undefined ) return dump_unum( $mol_vary_tip.link, offset )
				
				dump_unum( $mol_vary_tip.blob, val.byteLength )
				acquire( 1 + val.byteLength )
				
				if( val instanceof Uint8Array ) this.array[ pos ++ ] = $mol_vary_tip.uint | $mol_vary_len.L1
				else if( val instanceof Uint16Array ) this.array[ pos ++ ] = $mol_vary_tip.uint | $mol_vary_len.L2
				else if( val instanceof Uint32Array ) this.array[ pos ++ ] = $mol_vary_tip.uint | $mol_vary_len.L4
				else if( val instanceof BigUint64Array ) this.array[ pos ++ ] = $mol_vary_tip.uint | $mol_vary_len.L8
				
				else if( val instanceof Int8Array ) this.array[ pos ++ ] = $mol_vary_tip.sint | ~$mol_vary_len.L1
				else if( val instanceof Int16Array ) this.array[ pos ++ ] = $mol_vary_tip.sint | ~$mol_vary_len.L2
				else if( val instanceof Int32Array ) this.array[ pos ++ ] = $mol_vary_tip.sint | ~$mol_vary_len.L4
				else if( val instanceof BigInt64Array ) this.array[ pos ++ ] = $mol_vary_tip.sint | ~$mol_vary_len.L8
				
				else if( typeof Float16Array === 'function' && val instanceof Float16Array ) this.array[ pos ++ ] = $mol_vary_spec.fp16
				else if( val instanceof Float32Array ) this.array[ pos ++ ] = $mol_vary_spec.fp32
				else if( val instanceof Float64Array ) this.array[ pos ++ ] = $mol_vary_spec.fp64
			
				else $mol_fail( new Error( `Unsupported type` ) )
				
				const src = ( val instanceof Uint8Array ) ? val : new Uint8Array( val.buffer, val.byteOffset, val.byteLength )
				this.array.set( src, pos )
				pos += val.byteLength
				
				offsets.set( val, offsets.size )
			}
			
			const dump_list = ( val: any[] )=> {
				
				const offset = offsets.get( val )
				if( offset !== undefined ) return dump_unum( $mol_vary_tip.link, offset )
				
				dump_unum( $mol_vary_tip.list, val.length )
				acquire( val.length * 9 )
				
				if( stack.includes( val ) ) $mol_fail( new Error( 'Cyclic refs', { cause: { stack, val } } ) ) 
				stack.push( val )
				
				for( const item of val ) dump( item )
				
				if( stack.at(-1) !== val ) $mol_fail( new Error( 'Broken stack', { cause: { stack, val } } ) )
				stack.pop()
			
				offsets.set( val, offsets.size )
				
			}
			
			const shapes = new Map< string, any[] >()
			const shape = ( val: any )=> {
				const keys1 = Object.keys( val )
				const key = keys1.join('\0')
				const keys2 = shapes.get( key ) 
				if( keys2 ) return keys2
				shapes.set( key, keys1 )
				return keys1
			}
			
			const dump_object = ( val: object )=> {
				
				const offset = offsets.get( val )
				if( offset !== undefined ) return dump_unum( $mol_vary_tip.link, offset )
				
				const [ keys, vals ] = this.lean_find( val )?.( val ) ?? [ shape( val ), Object.values( val ) ]
			
				dump_unum( $mol_vary_tip.tupl, vals.length )
				acquire( (vals.length+1) * 9 )
				dump_list( keys )
				
				if( stack.includes( val ) ) $mol_fail( new Error( 'Cyclic refs', { cause: { stack, val } } ) ) 
				stack.push( val )
				
				for( const item of vals ) dump( item )
				
				if( stack.at(-1) !== val ) $mol_fail( new Error( 'Broken stack', { cause: { stack, val } } ) )
				stack.pop()
				
				offsets.set( val, offsets.size )
			}
			
			/** Recursive fills buffer with data. */
			const dump = ( val: unknown )=> {
				
				switch( typeof val ) {
					
					case 'undefined': {
						this.array[ pos ++ ] = $mol_vary_spec.both
						release( 8 )
						return
					}
					
					case 'boolean': {
						this.array[ pos ++ ] = val ? $mol_vary_spec.true : $mol_vary_spec.fake
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
							return this.array[ pos ++ ] = $mol_vary_spec.none
						}
						if( ArrayBuffer.isView( val ) ) return dump_buffer( val as ArrayBufferView< ArrayBuffer > )
						if( Array.isArray( val ) ) return dump_list( val )
						
						return dump_object( val )
						
					}
					
				}
				
				$mol_fail( new Error( `Unsupported type` ) )
			}
			
			for( const item of data ) {
				capacity += 9
				dump( item )
				if( stack.length ) $mol_fail( new Error( 'Stack underflow', { cause: { stack, item } } ) )
				offsets.clear()
			}
			
			if( pos !== capacity ) $mol_fail( new Error( 'Wrong reserved capacity', { cause: { capacity, size: pos, data } } ) )
			
			return this.array.slice( 0, pos )
			
		}
		
		/** Parses buffer to rich runtime structures. */
		take( array: Uint8Array< ArrayBuffer > ): unknown {
			
			const buffer = new DataView( array.buffer, array.byteOffset, array.byteLength )
			const stream = [] as unknown[]
			let pos = 0;
			
			const read_unum = ( kind: number )=> {
				
				++ pos
				const num = kind & 0b11111
				if( num < $mol_vary_len.L1 ) return num
				
				let res = 0 as number | bigint
				
				if( num === $mol_vary_len.L1 ) {
					res = buffer.getUint8( pos ++ )
				} else if( num === $mol_vary_len.L2 ) {
					res = buffer.getUint16( pos, true )
					pos += 2
				} else if( num === $mol_vary_len.L4 ) {
					res = buffer.getUint32( pos, true )
					pos += 4
				} else if( num === $mol_vary_len.L8 ) {
					res = buffer.getBigUint64( pos, true )
					if( res <= Number.MAX_SAFE_INTEGER ) res = Number( res )
					pos += 8
				} else {
					$mol_fail( new Error( 'Unsupported unum', { cause: { num } } ) )
				}
				
				if( ( kind & 0b111_00000 ) === $mol_vary_tip.uint ) stream.push( res )
				
				return res
			}
			
			const read_snum = ( kind: number )=> {
				
				const num = buffer.getInt8( pos ++ )
				if( num > - $mol_vary_len.L1 ) return num
				
				let res = 0 as number | bigint
				
				if( num === - $mol_vary_len.L1 ) {
					res = buffer.getInt8( pos ++ )
				} else if( num === - $mol_vary_len.L2 ) {
					res= buffer.getInt16( pos, true )
					pos += 2
				} else if( num === - $mol_vary_len.L4 ) {
					res = buffer.getInt32( pos, true )
					pos += 4
				} else if( num === - $mol_vary_len.L8 ) {
					res = buffer.getBigInt64( pos, true )
					if( res >= Number.MIN_SAFE_INTEGER && res <= Number.MAX_SAFE_INTEGER ) res = Number( res )
					pos += 8
				} else if( num === - $mol_vary_len.LA ) {
					const len = buffer.getUint16( pos, true ) + 9
					pos += 2
					res = $mol_bigint_decode( new Uint8Array( buffer.buffer, buffer.byteOffset + pos, len ) )
					pos += len
				} else {
					$mol_fail( new Error( 'Unsupported snum', { cause: { num } } ) )
				}
				
				stream.push( res )
				
				return res
			}
			
			const read_text = ( kind: number )=> {
				const len = read_unum( kind ) as number
				const [ text, bytes ] = $mol_charset_decode_from( array, pos, len )
				pos += bytes
				stream.push( text )
				return text
			}
			
			const read_buffer = ( len: number, TypedArray: new( buf: ArrayBuffer )=> ArrayBufferView< ArrayBuffer > )=> {
				const bin = new TypedArray( array.slice( pos, pos + len ).buffer )
				pos += len
				stream.push( bin )
				return bin
			}
			
			const read_blob = ( kind: number )=> {
				
				const len = read_unum( kind ) as number
				const kind_item = buffer.getUint8( pos ++ )
				
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
				
				const keys = read_vary() as readonly string[]
				const vals = new Array( len ) as any[]
				for( let i = 0; i < len; ++i ) vals[i] = read_vary()
				
				const node = this.rich_node( keys )
				let rich = node.get( null )
				
				if( !rich ) node.set( null, rich = pojo_maker( keys ) )
				
				const obj = rich( vals )
				
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
						const val = buffer.getFloat64( ++ pos, true )
						stream.push( val )
						pos += 8
						return val
					}
					
					case $mol_vary_spec.fp32: {
						const val = buffer.getFloat32( ++ pos, true )
						stream.push( val )
						pos += 4
						return val
					}
					
					case $mol_vary_spec.fp16: {
						const val = buffer.getFloat16( ++ pos, true )
						stream.push( val )
						pos += 2
						return val
					}
					
					default:
						$mol_fail( new Error( 'Unsupported spec', { cause: { kind } } ) )
					
				}
				
			}
			
			const read_vary = ()=> {
				
				const kind = buffer.getUint8( pos )
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
			
			const result = [] as unknown[]
			while( pos < array.byteLength ) {
				result.push( read_vary() )
				stream.length = 0	
			}
			
			return result
		}
		
		rich_index = new Map< string | null, any >([
			[ null, ()=> ({}) ]
		])
		
		/** Isolated Vary for custom types */
		room() {
			const room = new $mol_vary_class
			Object.setPrototypeOf( room, this )
			const index_clone = ( map: Map< string | null, any > ): Map<any,any> => new Map(
				[ ... map ].map(
					([ k, v ])=> [ k, k === null ? v : index_clone( v ) ]
				)
			)
			room.rich_index = index_clone( this.rich_index )
			return room
		}
		
		rich_node( keys: readonly string[] ) {
			
			let node = this.rich_index
			for( const key of keys ) {
				let sub = node.get( key )
				
				if( sub ) node = sub
				else node.set( key, node = new Map )
				
			}
			
			return node
		}
		
		lean_find( val: any ) {
			
			const lean = val[ this.lean_symbol ]
			if( lean ) return lean
			
			const sup = Object.getPrototypeOf( this )
			if( sup === Object.prototype ) return
			
			return sup.lean_find( val )
		}
		
		/** Adds custom types support. */
		type<
			const Instance extends object,
			const Keys extends readonly any[],
			const Vals extends readonly any[],
		>( { type, keys, rich, lean }: {
			type: new( ... vals: any[] )=> Instance,
			keys: Keys,
			lean: ( obj: Instance )=> Vals,
			rich: ( vals: Vals )=> Instance,
		}) {
			this.rich_node( keys ).set( null, rich )
			;( type.prototype as any )[ this.lean_symbol ] = ( val: Instance )=> [ keys, lean( val ) ]
		}
		
	}
	
	export let $mol_vary = new $mol_vary_class
		
	/** Native Map support */
	$mol_vary.type({
		type: Map,
		keys: [ 'keys', 'vals' ],
		lean: obj => [ [ ... obj.keys() ], [ ... obj.values() ] ],
		rich: ([ keys, vals ])=> new Map( keys.map( ( k, i )=> [ k, vals[i] ] ) ),
	})
	
	/** Native Set support */
	$mol_vary.type({
		type: Set,
		keys: [ 'set' ],
		lean: obj => [ [ ... obj.values() ] ],
		rich: ([ vals ])=> new Set( vals ),
	})
	
	/** Native Date support */
	$mol_vary.type({
		type: Date,
		keys: [ 'unix_time' ],
		lean: obj => [ obj.valueOf() / 1000 ],
		rich: ([ ts ])=> new Date( ts * 1000 ),
	})
	
	if( 'Element' in $mol_dom ) { // Absent in workers
		/** Native Element support */
		$mol_vary.type({
			type: $mol_dom.Element,
			keys: [ 'XML' ],
			lean: node => [ $mol_dom_serialize( node ) ],
			rich: ([ text ]) => $mol_dom_parse( text, 'application/xml' ).documentElement,
		})
	}
	
}
