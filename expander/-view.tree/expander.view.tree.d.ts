declare namespace $ {

	type $mol_check_expand__checked__RC1CDTU2 = $mol_type_enforce<
		ReturnType< $mol_expander['expanded'] >
		,
		ReturnType< $mol_check_expand['checked'] >
	>
	type $mol_check_expand__expandable__XL7C1N2P = $mol_type_enforce<
		ReturnType< $mol_expander['expandable'] >
		,
		ReturnType< $mol_check_expand['expandable'] >
	>
	type $mol_check_expand__label__DZKNR0PW = $mol_type_enforce<
		ReturnType< $mol_expander['label'] >
		,
		ReturnType< $mol_check_expand['label'] >
	>
	type $mol_view__sub__KUZ9Y5SX = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_list__rows__OWVIN5FW = $mol_type_enforce<
		ReturnType< $mol_expander['content'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_expander extends $mol_list {
		expanded( next?: boolean ): boolean
		expandable( ): boolean
		label( ): readonly(any)[]
		Trigger( ): $mol_check_expand
		Tools( ): any
		Label( ): $mol_view
		content( ): readonly(any)[]
		Content( ): $mol_list
		rows( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=expander.view.tree.d.ts.map