declare namespace $ {

	type $mol_check_group__title__B1PV0LO2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_check_group['title'] >
	>
	type $mol_check_group__checks__UW9OQO57 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_check_group['checks'] >
	>
	type $mol_check_box__title__XGZU9T7D = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['strength_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked__WHKOKC3G = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['strength'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title__S6YWREJO = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['perception_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked__PYOHD7O7 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['perception'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title__6L6U6I8Y = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['endurance_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked__6KLT74FG = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['endurance'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title__0GKYUAJC = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['charisma_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked__3VIXLAN4 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['charisma'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title__JBSKDHYA = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['intelligence_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked__NGOABQ11 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['intelligence'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title__TFR59SA0 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['agility_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked__P47HUZM8 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['agility'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title__ZM56VC34 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['luck_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked__QMYQXPGT = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['luck'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_list__rows__KJ3ABBSB = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_list__rows__410772J7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_check_group_demo extends $mol_example_small {
		All( ): $mol_check_group
		strength_title( ): string
		strength( next?: boolean ): boolean
		Strength( ): $mol_check_box
		perception_title( ): string
		perception( next?: boolean ): boolean
		Perception( ): $mol_check_box
		endurance_title( ): string
		endurance( next?: boolean ): boolean
		Endurance( ): $mol_check_box
		charisma_title( ): string
		charisma( next?: boolean ): boolean
		Charisma( ): $mol_check_box
		intelligence_title( ): string
		intelligence( next?: boolean ): boolean
		Intelligence( ): $mol_check_box
		agility_title( ): string
		agility( next?: boolean ): boolean
		Agility( ): $mol_check_box
		luck_title( ): string
		luck( next?: boolean ): boolean
		Luck( ): $mol_check_box
		Partial( ): $mol_list
		Demo_items( ): $mol_list
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map