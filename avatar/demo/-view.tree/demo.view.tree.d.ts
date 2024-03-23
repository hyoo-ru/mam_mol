declare namespace $ {

	type $mol_string__value__YF1ED8V5 = $mol_type_enforce<
		ReturnType< $mol_avatar_demo['avatar_id'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_labeler__title__LTEVBMCE = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__3CIG90SG = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_avatar__id__YBS79VAY = $mol_type_enforce<
		ReturnType< $mol_avatar_demo['avatar_id'] >
		,
		ReturnType< $mol_avatar['id'] >
	>
	type $mol_labeler__title__A9IZZK2A = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__KUJ7VMUB = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	export class $mol_avatar_demo extends $mol_example_small {
		avatar_id( next?: string ): string
		Avatar_id_value( ): $mol_string
		Avatar_id_label( ): $mol_labeler
		Avatar( ): $mol_avatar
		Avatar_label( ): $mol_labeler
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map