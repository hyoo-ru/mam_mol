declare namespace $ {

	type $mol_check_group__title__6ZF6Z5FE = $mol_type_enforce<
		string
		,
		ReturnType< $mol_check_group['title'] >
	>
	type $mol_check_group__checks__F669PQQE = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_check_group['checks'] >
	>
	type $mol_check_box__title__IUG8A6P9 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['strength_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked__PR3ON4Z4 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['strength'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title__RQWOITNT = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['perception_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked__H7713NWV = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['perception'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title__8ILB994N = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['endurance_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked__MFPUMTY6 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['endurance'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title__QW7F2R0C = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['charisma_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked__MP41AP9V = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['charisma'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title__P1BQMMHY = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['intelligence_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked__N0GTXKP8 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['intelligence'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title__IF7UCX8W = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['agility_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked__SWKZ8G2I = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['agility'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title__J3V183BD = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['luck_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked__TGZ2KSUF = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['luck'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_list__rows__JMPDS8B0 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_list__rows__NO7DA4D4 = $mol_type_enforce<
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