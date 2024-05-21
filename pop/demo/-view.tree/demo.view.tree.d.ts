declare namespace $ {

	type $mol_check_box__hint__HSSMNOCZ = $mol_type_enforce<
		ReturnType< $mol_pop_demo['pop_showed_check_hint'] >
		,
		ReturnType< $mol_check_box['hint'] >
	>
	type $mol_check_box__checked__5TY2POK5 = $mol_type_enforce<
		ReturnType< $mol_pop_demo['pop_showed'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_labeler__title__VR2KSW26 = $mol_type_enforce<
		ReturnType< $mol_pop_demo['show_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__H0CNTV6H = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_switch__value__IGT0SBK1 = $mol_type_enforce<
		ReturnType< $mol_pop_demo['pop_align'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options__LSAYBDA4 = $mol_type_enforce<
		ReturnType< $mol_pop_demo['aligins'] >
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_labeler__title__C3SUA9JN = $mol_type_enforce<
		ReturnType< $mol_pop_demo['align_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__Z5MY9EMS = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__D9FS9W1N = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_button_major__sub__MV35CMRE = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	type $mol_row__minimal_width__1JL13M0U = $mol_type_enforce<
		number
		,
		ReturnType< $mol_row['minimal_width'] >
	>
	type $mol_row__sub__NSGGB3VA = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_pop__Anchor__5F2FFU1X = $mol_type_enforce<
		ReturnType< $mol_pop_demo['Pop_anchor'] >
		,
		ReturnType< $mol_pop['Anchor'] >
	>
	type $mol_pop__showed__KYZZMIBA = $mol_type_enforce<
		ReturnType< $mol_pop_demo['pop_showed'] >
		,
		ReturnType< $mol_pop['showed'] >
	>
	type $mol_pop__align__GJJNVQFW = $mol_type_enforce<
		ReturnType< $mol_pop_demo['pop_align'] >
		,
		ReturnType< $mol_pop['align'] >
	>
	type $mol_pop__bubble_content__0PU6Y5AV = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pop['bubble_content'] >
	>
	type $mol_view__sub__5T8OXA2A = $mol_type_enforce<
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