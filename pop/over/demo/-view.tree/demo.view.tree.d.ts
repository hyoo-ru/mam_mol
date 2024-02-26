declare namespace $ {

	type $mol_button_minor__title__1ATYHN2N = $mol_type_enforce<
		ReturnType< $mol_pop_over_demo['open_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__title__8RPRCDOU = $mol_type_enforce<
		ReturnType< $mol_pop_over_demo['export_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__title__MVJVXD91 = $mol_type_enforce<
		ReturnType< $mol_pop_over_demo['save_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_list__rows__EK88VKL3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_pop_over__align__RZ49XQH2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pop_over['align'] >
	>
	type $mol_pop_over__Anchor__4JAX07MC = $mol_type_enforce<
		ReturnType< $mol_pop_over_demo['file_title'] >
		,
		ReturnType< $mol_pop_over['Anchor'] >
	>
	type $mol_pop_over__bubble_content__YJMK9C6G = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pop_over['bubble_content'] >
	>
	type $mol_button_minor__title__W0ZU0AVA = $mol_type_enforce<
		ReturnType< $mol_pop_over_demo['updates_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__title__JBUL9MTN = $mol_type_enforce<
		ReturnType< $mol_pop_over_demo['about_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_list__rows__5HIS6MA8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_pop_over__align__97ZXVMZK = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pop_over['align'] >
	>
	type $mol_pop_over__Anchor__BISMREVU = $mol_type_enforce<
		ReturnType< $mol_pop_over_demo['help_title'] >
		,
		ReturnType< $mol_pop_over['Anchor'] >
	>
	type $mol_pop_over__bubble_content__44Z6Z3MG = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pop_over['bubble_content'] >
	>
	type $mol_row__sub__8OU26250 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	export class $mol_pop_over_demo extends $mol_example_small {
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
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map