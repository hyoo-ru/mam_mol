declare namespace $ {

	type $mol_text__text__5Z7HWG2A = $mol_type_enforce<
		ReturnType< $mol_pick_demo['info_content_text'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_pick__title__786B1Z1I = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['title'] >
	>
	type $mol_pick__bubble_content__04GPJM8K = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['bubble_content'] >
	>
	type $mol_button_copy__title__4JPLILHB = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__text__JDQ6MBRP = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['text'] >
	>
	type $mol_button_download__title__ONZK7AA8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_download['title'] >
	>
	type $mol_button_download__blob__DFPMR0CL = $mol_type_enforce<
		ReturnType< $mol_pick_demo['Menu_item_download_blob'] >
		,
		ReturnType< $mol_button_download['blob'] >
	>
	type $mol_button_download__file_name__DIAAXJB6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_download['file_name'] >
	>
	type $mol_button_major__title__AU0OE2TE = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click__G7HJZ2FB = $mol_type_enforce<
		ReturnType< $mol_pick_demo['delete_confirm'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_pick__align__Y6BMRB6F = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['align'] >
	>
	type $mol_pick__trigger_content__0N50IZ6A = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['trigger_content'] >
	>
	type $mol_pick__bubble_content__J1JEK5WW = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['bubble_content'] >
	>
	type $mol_list__rows__N169UP4Q = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_pick__hint__3VNHZF00 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['hint'] >
	>
	type $mol_pick__trigger_content__4YHCM2V9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['trigger_content'] >
	>
	type $mol_pick__bubble_content__E5GID1M6 = $mol_type_enforce<
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