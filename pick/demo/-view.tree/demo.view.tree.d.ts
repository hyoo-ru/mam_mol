declare namespace $ {

	type $mol_text__text__1IO7BI6N = $mol_type_enforce<
		ReturnType< $mol_pick_demo['info_content_text'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_pick__title__XU4I2SFH = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['title'] >
	>
	type $mol_pick__bubble_content__EW2SIJOO = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['bubble_content'] >
	>
	type $mol_button_copy__title__I8XUVYQF = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__text__TJWY00D6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['text'] >
	>
	type $mol_button_download__title__5XRUDGKL = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_download['title'] >
	>
	type $mol_button_download__blob__Z4L1VPOF = $mol_type_enforce<
		ReturnType< $mol_pick_demo['Menu_item_download_blob'] >
		,
		ReturnType< $mol_button_download['blob'] >
	>
	type $mol_button_download__file_name__1TWOWWH4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_download['file_name'] >
	>
	type $mol_button_major__title__3WE3SV47 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__KWWC18CW = $mol_type_enforce<
		ReturnType< $mol_pick_demo['delete_confirm'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_pick__align__BMDU4Y61 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['align'] >
	>
	type $mol_pick__trigger_content__RGO3RQNC = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['trigger_content'] >
	>
	type $mol_pick__bubble_content__HZ1LSF6I = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['bubble_content'] >
	>
	type $mol_list__rows__GIZ4G70B = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_pick__hint__NBZD5VNQ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['hint'] >
	>
	type $mol_pick__trigger_content__V3MOT06F = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['trigger_content'] >
	>
	type $mol_pick__bubble_content__53B20N3D = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['bubble_content'] >
	>
	export class $mol_pick_demo extends $mol_example_small {
		info_content_text( ): string
		Info_content( ): $mol_text
		Info_pop( ): $mol_pick
		Options_trigger_icon( ): $mol_icon_menu
		Menu_item_copy( ): $mol_button_copy
		Menu_item_download_blob( ): $mol_blob
		Menu_item_download( ): $mol_button_download
		menu_item_delete_icon( ): $mol_icon_trash_can_outline
		menu_item_delete_label( ): string
		delete_confirm( next?: any ): any
		Delete_confirm( ): $mol_button_major
		Menu_item_delete( ): $mol_pick
		Options_content( ): $mol_list
		Options_pop( ): $mol_pick
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map