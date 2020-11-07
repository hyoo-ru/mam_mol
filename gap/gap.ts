namespace $ {
	const { vary } = $mol_style_func
	export let $mol_gap = {
		block: vary( '--mol_gap_block' ) ,
		text: vary( '--mol_gap_text' ),
	} as const
}
