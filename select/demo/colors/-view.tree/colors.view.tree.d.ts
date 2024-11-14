declare namespace $ {

	type $mol_select_colors_color_preview__color__00VIC9JH = $mol_type_enforce<
		ReturnType< $mol_select_demo_colors['option_color'] >
		,
		ReturnType< $mol_select_colors_color_preview['color'] >
	>
	type $mol_dimmer__haystack__6MG21N1A = $mol_type_enforce<
		ReturnType< $mol_select_demo_colors['color_name'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle__85ITO2GM = $mol_type_enforce<
		ReturnType< $mol_select_demo_colors['color_filter'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_view__sub__QBE5KF69 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__minimal_height__FVPKOA7V = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_select__value__QFYX7QZB = $mol_type_enforce<
		ReturnType< $mol_select_demo_colors['color'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_select__dictionary__MDQN1DWL = $mol_type_enforce<
		ReturnType< $mol_select_demo_colors['colors'] >
		,
		ReturnType< $mol_select['dictionary'] >
	>
	type $mol_select__option_label__H6SA5ZAL = $mol_type_enforce<
		ReturnType< $mol_select_demo_colors['color_name'] >
		,
		ReturnType< $mol_select['option_label'] >
	>
	type $mol_select__option_content__OSGDZS1A = $mol_type_enforce<
		ReturnType< $mol_select_demo_colors['option_content'] >
		,
		ReturnType< $mol_select['option_content'] >
	>
	export class $mol_select_demo_colors extends $mol_example_small {
		color_filter( ): ReturnType< ReturnType< $mol_select_demo_colors['Color'] >['filter_pattern'] >
		color( next?: string ): string
		colors( ): Record<string, any>
		color_name( id: any): string
		option_color( id: any): string
		Color_preview( id: any): $mol_select_colors_color_preview
		Color_name( id: any): $mol_dimmer
		Color_option( id: any): $mol_view
		option_content( id: any): readonly(any)[]
		Color( ): $mol_select
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
	export class $mol_select_colors_color_preview extends $mol_view {
		color( ): string
		style( ): ({ 
			'background': ReturnType< $mol_select_colors_color_preview['color'] >,
		})  & ReturnType< $mol_view['style'] >
	}
	
}

//# sourceMappingURL=colors.view.tree.d.ts.map