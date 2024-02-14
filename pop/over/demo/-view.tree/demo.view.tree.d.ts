declare namespace $ {

	type $mol_button_minor__title__4HLUZ3TJ = $mol_type_enforce<
		ReturnType< $mol_pop_over_demo['open_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__title__2FS76QE3 = $mol_type_enforce<
		ReturnType< $mol_pop_over_demo['export_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__title__7PHSNYEJ = $mol_type_enforce<
		ReturnType< $mol_pop_over_demo['save_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_list__rows__9YE157AR = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_pop_over__align__7LW7TBTA = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pop_over['align'] >
	>
	type $mol_pop_over__Anchor__AWQU4V29 = $mol_type_enforce<
		ReturnType< $mol_pop_over_demo['file_title'] >
		,
		ReturnType< $mol_pop_over['Anchor'] >
	>
	type $mol_pop_over__bubble_content__JKV9WXHZ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pop_over['bubble_content'] >
	>
	type $mol_button_minor__title__LXDNBWM9 = $mol_type_enforce<
		ReturnType< $mol_pop_over_demo['updates_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__title__Y0CE8G53 = $mol_type_enforce<
		ReturnType< $mol_pop_over_demo['about_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_list__rows__LYCVA38H = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_pop_over__align__M1RL9BXT = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pop_over['align'] >
	>
	type $mol_pop_over__Anchor__L8GFY2ZV = $mol_type_enforce<
		ReturnType< $mol_pop_over_demo['help_title'] >
		,
		ReturnType< $mol_pop_over['Anchor'] >
	>
	type $mol_pop_over__bubble_content__M5Y8AZ3V = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pop_over['bubble_content'] >
	>
	type $mol_row__sub__9H4PAQDK = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	export class $mol_pop_over_demo extends $mol_example_small {
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
		file_title( ): string
		open_title( ): string
		Open( ): $mol_button_minor
		export_title( ): string
		Export( ): $mol_button_minor
		save_title( ): string
		Save( ): $mol_button_minor
		File_menu( ): $mol_list
		File( ): $mol_pop_over
		help_title( ): string
		updates_title( ): string
		Updates( ): $mol_button_minor
		about_title( ): string
		About( ): $mol_button_minor
		Help_menu( ): $mol_list
		Help( ): $mol_pop_over
		Menu( ): $mol_row
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map