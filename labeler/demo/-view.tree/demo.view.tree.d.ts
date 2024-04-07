declare namespace $ {

	type $mol_labeler__title__MVYNIE7A = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__XVBV5ED0 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_string__hint__W81NM5H1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value__7L2C66P5 = $mol_type_enforce<
		ReturnType< $mol_labeler_demo['user_name'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_labeler__title__8D7JVCTA = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__Content__P9MSZGCO = $mol_type_enforce<
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