namespace $ {

	export function $mol_compare_text< Item >( item = ( item : Item )=> String( item ) ) {
		return ( a : Item , b : Item )=> {
			const text_a = item( a ).trim().toLowerCase()
			const text_b = item( b ).trim().toLowerCase()
			return text_a > text_b ? 1 : text_a < text_b ? -1 : 0
		}
	}

}
