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
	
	function num_len( num: number | bigint ) {
		
		if( typeof num === 'number' && !Number.isInteger( num ) ) return 8
		
		if( num < 0 ) {
			
			if( num >= -28 ) return 0
			if( num >= -(2**7) ) return 1
			if( num >= -(2**15) ) return 2
			if( num >= -(2**31) ) return 4
			if( num >= -(2n**63n) ) return 8
			
			$mol_fail( new Error( `Too low numb ${ num }` ) )
			
		} else {
			
			if( num < 28 ) return 0
			if( num < 2**8 ) return 1
			if( num < 2**16 ) return 2
			if( num < 2**32 ) return 4
			if( num < 2n**64n ) return 8
			
			$mol_fail( new Error( `Too high numb ${ num }` ) )
			
		}
		
	}
	
	/** VaryPack - simple fast compact data binarization format. */
	export class $mol_vary extends DataView< ArrayBuffer > {
		
		/** Packs any data to Uint8Array with deduplication. */
		static pack( data: unknown ) {
			
			const leaned = new WeakMap< object, readonly[ keys: readonly any[], vals: readonly any[] ] >()
			const lean = ( val: object ): readonly[ keys: readonly any[], vals: readonly any[] ] => {
				
				let tupl = leaned.get( val )
				if( tupl ) return tupl
				
				leaned.set( val, tupl = this.lean( val ) )
				return tupl
				
			}
			
			const hashes = new Map< unknown, number >()
			/** Recursive hash for deduplication */
			const hash = ( val: unknown ): number => {
				
				switch( typeof val ) {
					
					case 'undefined':
						return 0
					
					case 'number':
					case 'boolean':
						return Number( val )
					
					case 'number':
						return val
					
					case 'bigint':
						return $mol_hash_numbers( $mol_bigint_encode( val ), $mol_vary_tip.sint )
					
					case 'string': {
						let res = hashes.get( val )
						if( res != null ) return res
						res = $mol_hash_string( val, $mol_vary_tip.text )
						hashes.set( val, res )
						return res
					}
					
					case 'object': {
						
						if( !val ) return $mol_vary_spec.none
					
						let res = hashes.get( val )
						if( res != null ) return res
						
						if( ArrayBuffer.isView( val ) ) res = $mol_hash_numbers( new Uint8Array( val.buffer, val.byteOffset, val.byteLength ), $mol_vary_tip.blob )
						else if( Array.isArray( val ) ) res = $mol_hash_numbers( val.map( hash ), $mol_vary_tip.list )
						else {
							const [ keys, vals ] = lean( val )
							res = $mol_hash_numbers( [ hash( keys ), ... vals.map( hash ) ], $mol_vary_tip.tupl )
						}
						
						hashes.set( val, res )
						return res
					}
					
				}
				$mol_fail( new Error( `Unsupported type` ) )
			}
			
			let size = 0
			const offsets = new Map< number /*hash*/, number >()
			const sizes = new Map< string, number >()
			const stream = [] as unknown[]
			
			/** Reserve size for embedding first entry or link to existen one.*/
			const dedup = ( val: unknown, len: number )=> {
				
				const key = hash( val )
				let offset = offsets.get( key )
				
				if( offset === undefined ) { // embed first
					
					offsets.set( key, offset = stream.length )
					stream.push( val )
					size += len
					
					return true
					
				} else { // link to exists
					
					size += 1 + num_len( offset )
					return false
					
				}
				
			}
			
			/** Recursive calculates required buffer size. */
			const calc = ( val: unknown )=> {
				
				if( val == null ) {
					size += 1
					return true
				}
				
				switch( typeof val ) {
					
					case 'boolean':
						size += 1
						return true
					
					case 'number':
					case 'bigint':
						size += 1 + num_len( val )
						return true
					
					case 'string': {
						
						let len = sizes.get( val )
						if( len == null ) sizes.set( val, len = $mol_charset_encode_size( val ) )
						
						if( !len ) { // always embed redundant
							size += 1
							return true
						}
						
						return dedup( val, 1 + num_len( len ) + len )
						
					}
					
					case 'object': {
						
						if( ArrayBuffer.isView( val ) ) {
							
							if( !val.byteLength ) { // always embed redundant
								size += 2
								return true
							}
							
							return dedup( val, 2 + num_len( val.byteLength ) + val.byteLength )
							
						}
						
						if( Array.isArray( val ) ) {
							
							if( !val.length ) { // always embed redundant
								size += 1
								return true
							}
							
							const key = hash( val )
							let offset = offsets.get( key )
							if( offset === undefined ) {
								for( const item of val ) calc( item )
							}
						
							return dedup( val, 1 + num_len( val.length ) )
							
						}
						
						const [ keys, vals ] = lean( val )
						
						if( !vals.length ) { // always embed redundant
							size += 2
							return true
						}
							
						const key = hash( val )
						let offset = offsets.get( key )
						if( offset === undefined ) {
							calc( keys )
							for( const item of vals ) calc( item )
						}
					
						return dedup( val, 1 + num_len( vals.length ) )
						
					}
					
				}
				
				$mol_fail( new Error( `Unsupported type` ) )
			}
			
			calc( data )
			
			const buf = new Uint8Array( size )
			const pack = new this( buf.buffer )
			const embedded = new Set< number >()
			
			let pos = 0
			/** Recursive fills buffer with data. */
			const dump = ( val: unknown )=> {
				
				if( pos >= size ) $mol_fail( new Error( 'Wrong buffer length', { cause: buf } ) )
				
				switch( typeof val ) {
					
					case 'undefined': {
						pack.tlen( pos, 'spec', $mol_vary_spec.both )
						pos += 1
						return
					}
					
					case 'boolean': {
						
						pack.tlen( pos, 'spec', val ? $mol_vary_spec.true : $mol_vary_spec.fake )
						pos += 1
						
						return
					}
					
					case 'number': {
						
						if( !Number.isInteger( val ) ) {
							pos += pack.tfp( pos, 'spec', val )
						} else if( val < 0 ) {
							pos += pack.tint( pos, 'sint', val )
						} else {
							pos += pack.tnat( pos, 'uint', val )
						}
						
						return
					}
						
					case 'bigint': {
						
						if( val < 0 ) {
							pos += pack.tint( pos, 'sint', val )
						} else {
							pos += pack.tnat( pos, 'uint', val )
						}
						
						return
					}
					
					case 'string': {
						
						const key = hash( val )
						
						if( embedded.has( key ) ) {
							pos += pack.tnat( pos, 'link', offsets.get( key )! )
							return
						}
						
						pos += pack.tnat( pos, 'text', sizes.get( val )! )
						pos += $mol_charset_encode_to( val, buf, pos )
						
						if( val.length ) embedded.add( key )
						return
						
					}
					
					case 'object': {
						
						if( !val ) {
							pack.tlen( pos, 'spec', $mol_vary_spec.none )
							pos += 1
							return
						}
					
						if( ArrayBuffer.isView( val ) ) {
							
							const key = hash( val )
							
							if( embedded.has( key ) ) {
								pos += pack.tnat( pos, 'link', offsets.get( key )! )
								return
							}
							
							pos += pack.tnat( pos, 'blob', val.byteLength )
							
							if( val instanceof Uint8Array ) pos += pack.tlen( pos, 'uint', $mol_vary_len[1] )
							else if( val instanceof Uint16Array ) pos += pack.tlen( pos, 'uint', $mol_vary_len[2] )
							else if( val instanceof Uint32Array ) pos += pack.tlen( pos, 'uint', $mol_vary_len[4] )
							else if( val instanceof BigUint64Array ) pos += pack.tlen( pos, 'uint', $mol_vary_len[8] )
							
							else if( val instanceof Int8Array ) pos += pack.tlen( pos, 'sint', ~$mol_vary_len[1] )
							else if( val instanceof Int16Array ) pos += pack.tlen( pos, 'sint', ~$mol_vary_len[2] )
							else if( val instanceof Int32Array ) pos += pack.tlen( pos, 'sint', ~$mol_vary_len[4] )
							else if( val instanceof BigInt64Array ) pos += pack.tlen( pos, 'sint', ~$mol_vary_len[8] )
							
							// else if( val instanceof Float16Array ) pos += pack.tlen( pos, 'spec', $mol_vary_spec.fp16 )
							else if( val instanceof Float32Array ) pos += pack.tlen( pos, 'spec', $mol_vary_spec.fp32 )
							else if( val instanceof Float64Array ) pos += pack.tlen( pos, 'spec', $mol_vary_spec.fp64 )
						
							else $mol_fail( new Error( `Unsupported type` ) )
							
							buf.set( new Uint8Array( val.buffer, val.byteOffset, val.byteLength ), pos )
							pos += val.byteLength
								
							if( val.byteLength ) embedded.add( key )
							return
							
						}
						
						if( Array.isArray( val ) ) {
							
							const key = hash( val )
							
							if( embedded.has( key ) ) {
								pos += pack.tnat( pos, 'link', offsets.get( key )! )
								return
							}
							
							pos += pack.tnat( pos, 'list', val.length )
							for( const item of val ) dump( item )
						
							if( val.length ) embedded.add( key )
							return
						
						}
						
						const key = hash( val )
						
						if( embedded.has( key ) ) {
							pos += pack.tnat( pos, 'link', offsets.get( key )! )
							return
						}
						
						const [ keys, vals ] = lean( val )
					
						pos += pack.tnat( pos, 'tupl', vals.length )
						dump( keys )
						for( const item of vals ) dump( item )
							
						if( vals.length ) embedded.add( key )
						return
						
					}
					
				}
				
				$mol_fail( new Error( `Unsupported type` ) )
			}
			
			dump( data )
			
			return buf
			
		}
		
		/** Parses buffer to rich runtime structures. */
		static take( buf: Uint8Array< ArrayBuffer > ): unknown {
			
			const pack = new $mol_vary( buf.buffer, buf.byteOffset, buf.byteLength )
			const stream = [] as unknown[]
			let pos = 0;
			
			const read_unum = ()=> {
				const num = pack.unum( pos )
				pos += 1 + pack.ulen( pos )
				return num
			}
			
			const read_snum = ()=> {
				const num = pack.snum( pos )
				pos += 1 + pack.slen( pos )
				return num
			}
			
			const read_text = ()=> {
				const len = read_unum() as number
				const bin = new Uint8Array( buf.buffer, pack.byteOffset + pos, len )
				pos += len
				const text = $mol_charset_decode( bin )
				if( text.length ) stream.push( text )
				return text
			}
			
			const read_buffer = ( len: number, TypedArray: new( buf: ArrayBuffer )=> ArrayBufferView< ArrayBuffer > )=> {
				const bin = new TypedArray( buf.slice( pos, pos + len ).buffer )
				pos += len
				if( len ) stream.push( bin )
				return bin
			}
			
			const read_blob = ()=> {
				
				const len = read_unum() as number
				const kind = pack.getUint8( pos ++ )
				
				switch( kind ) {
					
					case $mol_vary_tip.uint | $mol_vary_len[1]: return read_buffer( len, Uint8Array )
					case $mol_vary_tip.uint | $mol_vary_len[2]: return read_buffer( len, Uint16Array )
					case $mol_vary_tip.uint | $mol_vary_len[4]: return read_buffer( len, Uint32Array )
					case $mol_vary_tip.uint | $mol_vary_len[8]: return read_buffer( len, BigUint64Array )
					
					case $mol_vary_tip.sint | ~$mol_vary_len[1] + 256: return read_buffer( len, Int8Array )
					case $mol_vary_tip.sint | ~$mol_vary_len[2] + 256: return read_buffer( len, Int16Array )
					case $mol_vary_tip.sint | ~$mol_vary_len[4] + 256: return read_buffer( len, Int32Array )
					case $mol_vary_tip.sint | ~$mol_vary_len[8] + 256: return read_buffer( len, BigInt64Array )
					
					// case $mol_vary_tip.spec | $mol_vary_spec.fp16: return read_buffer( len, Float16Array )
					case $mol_vary_tip.spec | $mol_vary_spec.fp32: return read_buffer( len, Float32Array )
					case $mol_vary_tip.spec | $mol_vary_spec.fp64: return read_buffer( len, Float64Array )
					
					default:
						$mol_fail( new Error( 'Unsupported blob kind', { cause: { kind } } ) )
				}
				
			}
			
			const read_list = ()=> {
				const len = read_unum() as number
				const list = [] as any[]
				for( let i = 0; i < len; ++i ) list.push( read_vary() )
				if( len ) stream.push( list )
				return list
			}
			
			const read_link = ()=> {
				const index = read_unum() as number
				if( index >= stream.length ) $mol_fail( new Error( 'Too large index', { cause: { index, exists: stream.length } } ) )
				return stream[ index ]
			}
			
			const read_tupl = ()=> {
				
				const len = read_unum() as number
				
				const keys = pack.tip( pos ) === 'link' ? read_link() : read_list()
				if( !Array.isArray( keys ) ) $mol_fail( new Error( 'Wrong tupl shape type', { cause: { type: typeof keys } } ) )
				
				const vals = Array.from( { length: len }, ()=> read_vary() )
				
				const obj = this.rich( keys, vals )
				if( vals.length ) stream.push( obj )
				
				return obj
			}
			
			const read_spec = ()=> {
				
				const kind = pack.getUint8( pos )
				const spec = $mol_vary_spec[ kind ] as keyof typeof $mol_vary_spec 
				
				switch( spec ) {
					
					case 'none':
						++ pos
						return null
					
					case 'fake':
						++ pos
						return false
					
					case 'true':
						++ pos
						return true
					
					case 'both':
						++ pos
						return undefined
					
					case 'fp16': {
						const val = pack.getFloat16( pos + 1, true )
						pos += 3
						return val
					}
					
					case 'fp32': {
						const val = pack.getFloat32( pos + 1, true )
						pos += 5
						return val
					}
					
					case 'fp64': {
						const val = pack.getFloat64( pos + 1, true )
						pos += 9
						return val
					}
					
					default:
						$mol_fail( new Error( 'Unsupported spec', { cause: { kind } } ) )
					
				}
				
			}
			
			const read_vary = ()=> {
				
				const tip = pack.tip( pos )
				
				switch( tip ) {
					
					case 'uint': return read_unum()
					case 'sint': return read_snum()
					case 'link': return read_link()
					case 'text': return read_text()
					case 'list': return read_list()
					case 'blob': return read_blob()
					case 'tupl': return read_tupl()
					case 'spec': return read_spec()
					
					default: $mol_fail( new Error( 'Unsupported tip', { cause: { tip } } ) )
				}
				
			}
			
			return read_vary()
		}
		
		tlen( pos: number, tip: keyof typeof $mol_vary_tip, len: number ) {
			this.setUint8( pos, $mol_vary_tip[ tip ] | len )
			return 1
		}
		
		tnat( pos: number, tip: keyof typeof $mol_vary_tip, num: number | bigint ) {
			
			const len = num_len( num )
			this.tlen( pos, tip, len ? $mol_vary_len[ len ] : Number( num ) )
			
			switch( len ) {
				case 0: break
				case 1: this.setUint8( pos + 1, Number( num ) ); break
				case 2: this.setUint16( pos + 1, Number( num ), true ); break
				case 4: this.setUint32( pos + 1, Number( num ), true ); break
				case 8: this.setBigUint64( pos + 1, BigInt( num ), true ); break
				default: $mol_fail( new Error( 'Unsupported uint len', { cause: { len } } ) )
			}

			return 1 + len
		}
		
		tint( pos: number, tip: keyof typeof $mol_vary_tip, num: number | bigint ) {
			
			const len = num_len( num )
			this.tlen( pos, tip, len ? - $mol_vary_len[ len ] -1 : Number( num ) )
			
			switch( len ) {
				case 0: break
				case 1: this.setInt8( pos + 1, Number( num ) ); break
				case 2: this.setInt16( pos + 1, Number( num ), true ); break
				case 4: this.setInt32( pos + 1, Number( num ), true ); break
				case 8: this.setBigInt64( pos + 1, BigInt( num ), true ); break
				default: $mol_fail( new Error( 'Unsupported sint len', { cause: { len } } ) )
			}

			return 1 + len
		}
		
		tfp( pos: number, tip: keyof typeof $mol_vary_tip, num: number ) {
			
			const len = num_len( num )
			this.tlen( pos, tip, len ? $mol_vary_len[ len ] : Number( num ) )
			
			switch( len ) {
				case 2: this.setFloat16( pos + 1, num, true ); break
				case 4: this.setFloat32( pos + 1, num, true ); break
				case 8: this.setFloat64( pos + 1, num, true ); break
				default: $mol_fail( new Error( 'Unsupported fp len', { cause: { len } } ) )
			}

			return 1 + len
		}
		
		tip( pos: number ) {
			return $mol_vary_tip[ this.getUint8( pos ) & 0b111_00000 ] as keyof typeof $mol_vary_tip
		}
		
		ulen( pos: number ) {
			const num = this.getUint8( pos ) & 0b11111
			if( num < 28 ) return 0
			switch( num ) {
				case 28: return 1
				case 29: return 2
				case 30: return 4
				case 31: return 8
				default: $mol_fail( new Error( 'Impossible!' ) )
			}
		}
		
		slen( pos: number ) {
			const num = this.getInt8( pos )
			if( num > -29 ) return 0
			switch( num ) {
				case -29: return 1
				case -30: return 2
				case -31: return 4
				case -32: return 8
				default: $mol_fail( new Error( 'Impossible!' ) )
			}
		}
		
		unum( pos: number ) {
			const num = this.getUint8( pos ) & 0b11111
			if( num < 28 ) return num
			switch( num ) {
				case 28: return this.getUint8( pos + 1 )
				case 29: return this.getUint16( pos + 1, true )
				case 30: return this.getUint32( pos + 1, true )
				case 31:
					const val = this.getBigUint64( pos + 1, true )
					if( val > Number.MAX_SAFE_INTEGER ) return val
					return Number( val )
				default: $mol_fail( new Error( 'Unsupported len', { cause: { num } } ) )
			}
		}
		
		snum( pos: number ) {
			const num = this.getInt8( pos )
			if( num > -29 ) return num
			switch( num ) {
				case -29: return this.getInt8( pos + 1 )
				case -30: return this.getInt16( pos + 1, true )
				case -31: return this.getInt32( pos + 1, true )
				case -32:
					const val = this.getBigInt64( pos + 1, true )
					if( val > Number.MAX_SAFE_INTEGER ) return val
					if( val < Number.MIN_SAFE_INTEGER ) return val
					return Number( val )
				default: $mol_fail( new Error( 'Unsupported len', { cause: { num } } ) )
			}
		}
		
		/** Converts internal keys&vals to high level object. */
		static rich( keys: any[], vals: any[] ): object {
			
			const shape = JSON.stringify([ keys, vals.map( v => typeof v ) ])
			const rich = this.riches.get( shape )
			if( rich ) return rich( ... vals )
			
			const pairs = keys.map( ( key, index ) => [ key, vals[ index ] ] )
			const obj = Object.fromEntries( pairs )
			
			return obj
		}
		 
		/** Converts high level object to internal keys&vals representation. */
		static lean( val: object ): readonly[ keys: readonly any[], vals: readonly any[] ] {
			
			const proto = Reflect.getPrototypeOf( val )!
			const lean = this.leanes.get( proto )
			if( lean ) return lean( val )
			
			return [ Object.keys( val ), Object.values( val ) ]
		}
		
		static leanes = new Map< object, ( val: any )=> readonly[ keys: readonly any[], vals: readonly any[] ] >()
		static riches = new Map< string/*shape*/, ( ... vals: readonly any[] )=> object >()
		
		/** Adds custom types support. */
		static register<
			const Instance extends object,
			const Keys extends readonly any[],
			const Vals extends readonly any[],
		>(
			rich: ( ( ... vals: Vals )=> Instance ) | ( ()=> Instance ),
			lean: ( obj: Instance )=> readonly[ Keys, Vals ],
		) {
			
			const obj = rich()
			const proto = Reflect.getPrototypeOf( obj )!
			
			const [ keys, vals ] = lean( obj )
			const shape = JSON.stringify( [ keys, vals.map( v => typeof v ) ] )
			
			this.leanes.set( proto, lean )
			this.riches.set( shape, rich )
		}
		
	}
	
	/** Native Map support */
	$mol_vary.register(
		( keys = [] as readonly any[], vals = [] as readonly any[] )=> new Map( keys.map( ( k, i )=> [ k, vals[i] ] ) ),
		obj => [
			[ 'keys', 'vals' ],
			[ [ ... obj.keys() ], [ ... obj.values() ] ],
		],
	)
	
	/** Native Set support */
	$mol_vary.register(
		( vals = [] as readonly any[] )=> new Set( vals ),
		obj => [
			[ 'vals' ],
			[ [ ... obj.values() ] ],
		],
	)
	
	/** Native Date support */
	$mol_vary.register(
		( ts = 0 )=> new Date( ts * 1000 ),
		obj => [
			[ 'unix_time' ],
			[ obj.valueOf() / 1000 ],
		],
	)
	
}
