namespace $ {
	
	export function $mol_text_distance(
		left: string,
		right: string,
	) {
		return $mol_text_profile_distance(
			$mol_text_profile( left ),
			$mol_text_profile( right ),
		)
	}
	
}
