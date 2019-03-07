namespace $ {

	export function $mol_compare_text< Item >( item = ( item : Item )=> String( item ) ) {
		
		return ( a : Item , b : Item )=> {

			const text_a = item( a ).trim().toLowerCase()
			const text_b = item( b ).trim().toLowerCase()

			const parts_a = text_a.split( /(\d+)/ )
			const parts_b = text_b.split( /(\d+)/ )

			const count = Math.max( parts_a.length , parts_b.length )
			
			for( let i = 0 ; i < count ; ++ i ) {

				const part_a = parts_a[i] || ''
				const part_b = parts_b[i] || ''
				
				const diff = Number( part_a ) - Number( part_b )
				if( diff ) return diff

				if( part_a > part_b ) return 1
				if( part_a < part_b ) return -1

			}
			
			return parts_a.length - parts_b.length
		}

	}

}
