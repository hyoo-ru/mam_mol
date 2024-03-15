declare namespace $ {

	type $mol_labeler__title__IENFJHCI = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__00SK76P8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_string__hint__WVUH58Y2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value__RNT8N4IF = $mol_type_enforce<
		ReturnType< $mol_labeler_demo['user_name'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_labeler__title__5WT5OC8C = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__Content__TAC8LVTY = $mol_type_enforce<
		ReturnType< $mol_labeler_demo['Name_control'] >
		,
		ReturnType< $mol_labeler['Content'] >
	>
	export class $mol_labeler_demo extends $mol_example_small {
		Provider( ): $mol_labeler
		user_name( next?: string ): string
		Name_control( ): $mol_string
		Name( ): $mol_labeler
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map