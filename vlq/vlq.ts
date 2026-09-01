namespace $ {

	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

	export function $mol_vlq_encode( val: number ): string {

		const sign = val < 0 ? 1 : 0
		if( sign ) val = -val

		let index = sign | ( ( val & 0b1111 ) << 1 )
		val >>>= 4
		
		let res = ''

		while( val ) {

			index |= 1 << 5
			res += alphabet[ index ]
			
			if( !val ) break
			
			index = val & 0b11111
			val >>>= 5
			
		}

		res += alphabet[ index ]

		return res
	}
	
}
