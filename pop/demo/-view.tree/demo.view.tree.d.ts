declare namespace $ {

	type $mol_check_box__hint__UGZKQH6E = $mol_type_enforce<
		ReturnType< $mol_pop_demo['pop_showed_check_hint'] >
		,
		ReturnType< $mol_check_box['hint'] >
	>
	type $mol_check_box__checked__7UBSFWOB = $mol_type_enforce<
		ReturnType< $mol_pop_demo['pop_showed'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_labeler__title__W3CPMD4E = $mol_type_enforce<
		ReturnType< $mol_pop_demo['show_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__9GP3UTCX = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_switch__value__JPBYG8QQ = $mol_type_enforce<
		ReturnType< $mol_pop_demo['pop_align'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options__Q7QX706W = $mol_type_enforce<
		ReturnType< $mol_pop_demo['aligins'] >
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_labeler__title__ZEE2DGK0 = $mol_type_enforce<
		ReturnType< $mol_pop_demo['align_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__YBPZTYDV = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__AKUJCLZU = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_button_major__sub__TZCXT9X3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	type $mol_row__minimal_width__D8ZAD5YI = $mol_type_enforce<
		number
		,
		ReturnType< $mol_row['minimal_width'] >
	>
	type $mol_row__sub__ORM7Y55N = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_pop__Anchor__01KXP4OO = $mol_type_enforce<
		ReturnType< $mol_pop_demo['Pop_anchor'] >
		,
		ReturnType< $mol_pop['Anchor'] >
	>
	type $mol_pop__showed__EXZL5VX2 = $mol_type_enforce<
		ReturnType< $mol_pop_demo['pop_showed'] >
		,
		ReturnType< $mol_pop['showed'] >
	>
	type $mol_pop__align__IS02X2RT = $mol_type_enforce<
		ReturnType< $mol_pop_demo['pop_align'] >
		,
		ReturnType< $mol_pop['align'] >
	>
	type $mol_pop__bubble_content__SJ4LT77X = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pop['bubble_content'] >
	>
	type $mol_view__sub__VL247IC5 = $mol_type_enforce<
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