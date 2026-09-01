namespace $ {

	/**
	 * Z-index values for layers
	 * https://page.hyoo.ru/#!=xthcpx_wqmiba
	 */
	export let $mol_layer = $mol_style_prop(
		'mol_layer',
		[
			'hover',
			'focus',
			'speck',
			'float',
			'popup',
		] as const
	)

}
