declare namespace $ {

	type $mol_check_box__hint__6GA8PAJE = $mol_type_enforce<
		ReturnType< $mol_pop_demo['pop_showed_check_hint'] >
		,
		ReturnType< $mol_check_box['hint'] >
	>
	type $mol_check_box__checked__K1X3JTD3 = $mol_type_enforce<
		ReturnType< $mol_pop_demo['pop_showed'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_labeler__title__JNB8XI0B = $mol_type_enforce<
		ReturnType< $mol_pop_demo['show_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__D3CI1TKB = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_switch__value__MKGPP0M5 = $mol_type_enforce<
		ReturnType< $mol_pop_demo['pop_align'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options__LEYPTI52 = $mol_type_enforce<
		ReturnType< $mol_pop_demo['aligins'] >
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_labeler__title__1SGX2TWL = $mol_type_enforce<
		ReturnType< $mol_pop_demo['align_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__EV2VC7HY = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__30Y6XY1M = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_button_major__sub__RJUQYYRF = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	type $mol_row__minimal_width__R9I2I9X0 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_row['minimal_width'] >
	>
	type $mol_row__sub__VQQ65X5T = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_pop__Anchor__C8QXEEVS = $mol_type_enforce<
		ReturnType< $mol_pop_demo['Pop_anchor'] >
		,
		ReturnType< $mol_pop['Anchor'] >
	>
	type $mol_pop__showed__75B4TIC8 = $mol_type_enforce<
		ReturnType< $mol_pop_demo['pop_showed'] >
		,
		ReturnType< $mol_pop['showed'] >
	>
	type $mol_pop__align__EZH7ZDQH = $mol_type_enforce<
		ReturnType< $mol_pop_demo['pop_align'] >
		,
		ReturnType< $mol_pop['align'] >
	>
	type $mol_pop__bubble_content__45F4NZKR = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pop['bubble_content'] >
	>
	type $mol_view__sub__YHEUPJRN = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_pop_demo extends $mol_example {
		show_title( ): string
		pop_showed_check_hint( ): string
		pop_showed( next?: boolean ): boolean
		Show_check( ): $mol_check_box
		Showed( ): $mol_labeler
		align_title( ): string
		pop_align( next?: string ): string
		aligins( ): ({ 
			'left_top': string,
			'left_center': string,
			'left_bottom': string,
			'right_top': string,
			'right_center': string,
			'right_bottom': string,
			'center': string,
			'top_left': string,
			'top_center': string,
			'top_right': string,
			'bottom_left': string,
			'bottom_center': string,
			'bottom_right': string,
		}) 
		Align_select( ): $mol_switch
		Align( ): $mol_labeler
		Manage( ): $mol_row
		anchor_button_icon( ): $mol_icon_anchor
		anchor_button_title( ): string
		Pop_anchor( ): $mol_button_major
		bubble_hint( ): string
		Content( ): $mol_row
		Pop( ): $mol_pop
		Pop_area( ): $mol_view
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map