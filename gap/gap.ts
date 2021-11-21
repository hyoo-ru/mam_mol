namespace $ {
	const { vary } = $mol_style_func
	export let $mol_gap = {
		block: vary( '--mol_gap_block' ) ,
		text: vary( '--mol_gap_text' ),
		round: vary( '--mol_gap_round' ),
		space: vary( '--mol_gap_space' )
		blur: vary( '--mol_gap_blur' )
	} as const
}
