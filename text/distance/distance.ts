namespace $ {
	
	export function $mol_text_distance(
		left: string,
		right: string,
	) {
		return $mol_text_key_distance(
			$mol_text_key( left ),
			$mol_text_key( right ),
		)
	}
	
}
