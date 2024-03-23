declare namespace $ {

	type $mol_button_minor__title__I14MLES3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__title__EOH93KNC = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_page__tools__FXLNKHP2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body__0C4YRHQP = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__foot__DVLIW1MM = $mol_type_enforce<
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