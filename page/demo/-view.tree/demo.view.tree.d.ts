declare namespace $ {

	type $mol_button_minor__title__7PBE4HP0 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__title__CGPNRFKU = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_page__tools__PG2TTU58 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body__07FNGAWT = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__foot__SXMROEB5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['foot'] >
	>
	export class $mol_page_demo extends $mol_example_large {
		Button_tools( ): $mol_button_minor
		Text( ): $mol_filler
		Button_foot( ): $mol_button_minor
		Page( ): $mol_page
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map