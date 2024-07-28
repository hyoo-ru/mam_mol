declare namespace $ {

	type $mol_check_box__checked__AIVRKDHS = $mol_type_enforce<
		ReturnType< $mol_check_box_demo['base_checked'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title__3MS5SE95 = $mol_type_enforce<
		ReturnType< $mol_check_box_demo['c1Label'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__title__JIX6NFMU = $mol_type_enforce<
		ReturnType< $mol_check_box_demo['c2Label'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked__MBD947BO = $mol_type_enforce<
		ReturnType< $mol_check_box_demo['checked_checked'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title__BBHLW3I9 = $mol_type_enforce<
		ReturnType< $mol_check_box_demo['c6Label'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked__F2HHWAB3 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__enabled__NC9154Q4 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_check_box['enabled'] >
	>
	type $mol_check_box__checked__TMLCW3YN = $mol_type_enforce<
		ReturnType< $mol_check_box_demo['base_checked'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__checked__GO9X1HAA = $mol_type_enforce<
		ReturnType< $mol_check_box_demo['checked_checked'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__checked__OVIK0LKJ = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__enabled__UC2A43LU = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_check_box['enabled'] >
	>
	type $mol_list__rows__98RPNDOP = $mol_type_enforce<
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