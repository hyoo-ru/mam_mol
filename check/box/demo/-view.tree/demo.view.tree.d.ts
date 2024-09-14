declare namespace $ {

	type $mol_check_box__checked__W3K3JPFQ = $mol_type_enforce<
		ReturnType< $mol_check_box_demo['base_checked'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title__UX5CGJRO = $mol_type_enforce<
		ReturnType< $mol_check_box_demo['c1Label'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__title__EQE8YNWL = $mol_type_enforce<
		ReturnType< $mol_check_box_demo['c2Label'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked__JBPRSJZP = $mol_type_enforce<
		ReturnType< $mol_check_box_demo['checked_checked'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title__15ERWVK7 = $mol_type_enforce<
		ReturnType< $mol_check_box_demo['c6Label'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked__VP4W3T6Q = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__enabled__POMXN5JR = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_check_box['enabled'] >
	>
	type $mol_check_box__checked__80ES2BXF = $mol_type_enforce<
		ReturnType< $mol_check_box_demo['base_checked'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__checked__70GNDQ1B = $mol_type_enforce<
		ReturnType< $mol_check_box_demo['checked_checked'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__checked__1H0QAXV1 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__enabled__ZGG66ELG = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_check_box['enabled'] >
	>
	type $mol_list__rows__HBW32IRN = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_check_box_demo extends $mol_example_small {
		base_checked( next?: boolean ): boolean
		c1Label( ): string
		Labeled_base( ): $mol_check_box
		c2Label( ): string
		checked_checked( next?: boolean ): boolean
		Labeled_checked( ): $mol_check_box
		c6Label( ): string
		Labeled_disabled( ): $mol_check_box
		Alone_base( ): $mol_check_box
		Alone_checked( ): $mol_check_box
		Alone_disabled( ): $mol_check_box
		Demo_items( ): $mol_list
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map