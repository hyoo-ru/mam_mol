namespace $ {

	const { vary } = $mol_style_func

	export const $mol_theme = {
		back: vary('--mol_theme_back'),
		hover: vary('--mol_theme_hover'),
		current: vary('--mol_theme_current'),
		text: vary('--mol_theme_text'),
		control: vary('--mol_theme_control'),
		shade: vary('--mol_theme_shade'),
		line: vary('--mol_theme_line'),
		focus: vary('--mol_theme_focus'),
		field: vary('--mol_theme_field'),
		image: vary('--mol_theme_image'),
	}

}
