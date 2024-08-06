namespace $ {
	
	let sponge = new Uint32Array(80)
	
	/** Fast small sync SHA-1 */
	export function $mol_crypto_hash( data: Uint8Array ) {
		
		const bits = data.byteLength << 3
		const kbits = bits >> 5
		const kword = 0x80 << ( 24 - bits & 0b11111 )
		
		const bytes = 16 + ( bits + 64 >>> 9 << 4 )
		const klens = bytes - 1
		const words = new Int32Array( data.buffer, data.byteOffset, data.byteLength >> 2 )
		
		let tail = 0
		for( let i = words.length * 4; i < data.length; ++i ) {
			tail |= data[i] << ( i << 3 & 0b11000 )
		}
		
		// Initial
		const hash = new Int32Array([ 1732584193, -271733879, -1732584194, 271733878, -1009589776 ])
		
		// Digest
		for( let i = 0; i < bytes; i += 16 ) {
			
			let h0 = hash[0]
			let h1 = hash[1]
			let h2 = hash[2]
			let h3 = hash[3]
			let h4 = hash[4]

			for( let j = 0; j < 16; ++j ) {
				
				const k = i + j
				if( k === klens ) {
					
					sponge[j] = bits
					
				} else {
					
					let word =
						k === words.length ? tail :
						k > words.length ? 0 :
						words[k]
					
					word = word << 24 | word << 8 & 0xFF0000 | word >>> 8 & 0xFF00 | word >>> 24 & 0xFF // LE -> BE
					if( k === kbits ) word |= kword
					
					sponge[j] = word
					
				}
				
				const next = ( ( h1 & h2 | ~h1 & h3 ) + 1518500249 + h4 + ( sponge[j] >>> 0 ) + (( h0 << 5 )|( h0 >>> 27 )) )|0

				h4 = h3
				h3 = h2
				h2 = ( h1 << 30 )|( h1 >>> 2 )
				h1 = h0
				h0 = next
				
			}

			for( let j = 16; j < 20; ++j ) {
				
				const shuffle = sponge[j-3] ^ sponge[j-8] ^ sponge[j-14] ^ sponge[j-16]
				sponge[j] = shuffle << 1 | shuffle >>> 31
				
				const next = ( ( h1 & h2 | ~h1 & h3 ) + 1518500249 + h4 + ( sponge[j] >>> 0 ) + (( h0 << 5 )|( h0 >>> 27 )) )|0

				h4 = h3
				h3 = h2
				h2 = ( h1 << 30 )|( h1 >>> 2 )
				h1 = h0
				h0 = next
				
			}

			for( let j = 20; j < 40; ++j ) {
				
				const shuffle = sponge[j-3] ^ sponge[j-8] ^ sponge[j-14] ^ sponge[j-16]
				sponge[j] = shuffle << 1 | shuffle >>> 31
				
				const next = ( ( h1 ^ h2 ^ h3 ) + 1859775393 + h4 + ( sponge[j] >>> 0 ) + (( h0 << 5 )|( h0 >>> 27 )) )|0

				h4 = h3
				h3 = h2
				h2 = ( h1 << 30 )|( h1 >>> 2 )
				h1 = h0
				h0 = next
				
			}

			for( let j = 40; j < 60; ++j ) {
				
				const shuffle = sponge[j-3] ^ sponge[j-8] ^ sponge[j-14] ^ sponge[j-16]
				sponge[j] = shuffle << 1 | shuffle >>> 31
				
				const next = ( ( h1 & h2 | h1 & h3 | h2 & h3 ) - 1894007588 + h4 + ( sponge[j] >>> 0 ) + (( h0 << 5 )|( h0 >>> 27 )) )|0

				h4 = h3
				h3 = h2
				h2 = ( h1 << 30 )|( h1 >>> 2 )
				h1 = h0
				h0 = next
				
			}

			for( let j = 60; j < 80; ++j ) {
				
				const shuffle = sponge[j-3] ^ sponge[j-8] ^ sponge[j-14] ^ sponge[j-16]
				sponge[j] = shuffle << 1 | shuffle >>> 31
				
				const next = ( ( h1 ^ h2 ^ h3 ) - 899497514 + h4 + ( sponge[j] >>> 0 ) + (( h0 << 5 )|( h0 >>> 27 )) )|0

				h4 = h3
				h3 = h2
				h2 = ( h1 << 30 )|( h1 >>> 2 )
				h1 = h0
				h0 = next
				
			}

			hash[0] += h0
			hash[1] += h1
			hash[2] += h2
			hash[3] += h3
			hash[4] += h4
			
		}
		
		for( let i = 0; i < 20; ++i ) {
			const word = hash[i]
			hash[i] = word << 24 | word << 8 & 0xFF0000 | word >>> 8 & 0xFF00 | word >>> 24 & 0xFF // BE -> LE
		}

		return new Uint8Array( hash.buffer )
	}
	
}
