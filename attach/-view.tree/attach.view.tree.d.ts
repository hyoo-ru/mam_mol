declare namespace $ {

	type $mol_image__title_mol_attach_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_image['title'] >
	>
	type $mol_image__uri_mol_attach_2 = $mol_type_enforce<
		ReturnType< $mol_attach['item_uri'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_button_minor__click_mol_attach_3 = $mol_type_enforce<
		ReturnType< $mol_attach['item_drop'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_attach_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_open__title_mol_attach_5 = $mol_type_enforce<
		ReturnType< $mol_attach['attach_title'] >
		,
		ReturnType< $mol_button_open['title'] >
	>
	type $mol_button_open__files_mol_attach_6 = $mol_type_enforce<
		ReturnType< $mol_attach['attach_new'] >
		,
		ReturnType< $mol_button_open['files'] >
	>
	export class $mol_attach extends $mol_view {
		item_drop( id: any, next?: any ): any
		item_uri( id: any): string
		Image( id: any): $mol_image
		Item( id: any): $mol_button_minor
		attach_title( ): string
		attach_new( next?: any ): any
		Add( ): $mol_button_open
		content( ): readonly($mol_view)[]
		items( next?: readonly(string)[] ): readonly(string)[]
		sub( ): ReturnType< $mol_attach['content'] >
	}
	
}

//# sourceMappingURL=attach.view.tree.d.ts.map