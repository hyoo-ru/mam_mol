namespace $ {
	const { vary } = $mol_style_func
	/**
	 * Z-index values for layers
	 * https://page.hyoo.ru/#!=xthcpx_wqmiba
	 */
	export let $mol_layer = {
		hover: vary( '--mol_layer_hover' ),
		focus: vary( '--mol_layer_focus' ),
		speck: vary( '--mol_layer_speck' ),
		float: vary( '--mol_layer_float' ),
		popup: vary( '--mol_layer_popup' ),
	} as const
}
