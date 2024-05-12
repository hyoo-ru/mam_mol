declare namespace $ {

	type $mol_format__value__OU1VEL2F = $mol_type_enforce<
		ReturnType< $mol_pick_time['value'] >
		,
		ReturnType< $mol_format['value'] >
	>
	type $mol_format__mask__AOSMDEZC = $mol_type_enforce<
		string
		,
		ReturnType< $mol_format['mask'] >
	>
	type $mol_format__allow__02LU08ZK = $mol_type_enforce<
		string
		,
		ReturnType< $mol_format['allow'] >
	>
	type $mol_format__enabled__RSWNK7O6 = $mol_type_enforce<
		ReturnType< $mol_pick_time['enabled'] >
		,
		ReturnType< $mol_format['enabled'] >
	>
	type $mol_switch__value__JEONY6XU = $mol_type_enforce<
		ReturnType< $mol_pick_time['hour_selected'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options__TCDTGXVF = $mol_type_enforce<
		ReturnType< $mol_pick_time['hour_options'] >
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_paragraph__title__6OC8LQJ7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_paragraph['title'] >
	>
	type $mol_switch__value__GA8K12IZ = $mol_type_enforce<
		ReturnType< $mol_pick_time['minute_selected'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options__99MVI9FL = $mol_type_enforce<
		ReturnType< $mol_pick_time['minute_options'] >
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_row__sub__FTY7YQS0 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	export class $mol_pick_time extends $mol_pick {
		enabled( ): boolean
		value( next?: string ): string
		Input( ): $mol_format
		hour_selected( next?: string ): string
		hour_options( ): Record<string, any>
		Hours( ): $mol_switch
		Delimiter( ): $mol_paragraph
		minute_selected( next?: string ): string
		minute_options( ): Record<string, any>
		Minutes( ): $mol_switch
		Pickers( ): $mol_row
		Icon( ): $mol_icon_clock_outline
		trigger_enabled( ): ReturnType< $mol_pick_time['enabled'] >
		bubble_content( ): readonly(any)[]
		value_moment( next?: $mol_time_moment ): $mol_time_moment
	}
	
}

//# sourceMappingURL=time.view.tree.d.ts.map