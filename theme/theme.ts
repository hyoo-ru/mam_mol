namespace $ {

	const { vary } = $mol_style_func

	/**
	 * Theme css variables
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_textarea_demo
	 */
	export const $mol_theme = {
		back: vary('--mol_theme_back'),
		hover: vary('--mol_theme_hover'),
		card: vary('--mol_theme_card'),
		current: vary('--mol_theme_current'),
		special: vary('--mol_theme_special'),
		text: vary('--mol_theme_text'),
		control: vary('--mol_theme_control'),
		shade: vary('--mol_theme_shade'),
		line: vary('--mol_theme_line'),
		focus: vary('--mol_theme_focus'),
		field: vary('--mol_theme_field'),
		image: vary('--mol_theme_image'),
	}

}
