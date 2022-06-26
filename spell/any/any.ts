namespace $ {
	
	export const $mol_spell_any = $mol_regexp.from( {
		ru: $mol_spell_ru,
		// xx: [
		// 	$mol_regexp.begin,
		// 	$mol_regexp.repeat(
		// 		$mol_regexp.unicode_only( 'General_Category', 'Letter' ),
		// 		1,
		// 	),
		// 	$mol_regexp.end,
		// ],
	}, { ignoreCase: true } )
	
}
