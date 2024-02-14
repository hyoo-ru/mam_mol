declare namespace $ {

	type $mol_button_open__title__X9DX69DE = $mol_type_enforce<
		ReturnType< $mol_attach['attach_title'] >
		,
		ReturnType< $mol_button_open['title'] >
	>
	type $mol_button_open__files__1N54K7CA = $mol_type_enforce<
		ReturnType< $mol_attach['attach_new'] >
		,
		ReturnType< $mol_button_open['files'] >
	>
	type $mol_button_minor__click__NIK132WM = $mol_type_enforce<
		ReturnType< $mol_attach['item_drop'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub__NJ969KB4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_row__sub__PF2QQF7O = $mol_type_enforce<
		ReturnType< $mol_attach['content'] >
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_image__title__81O4NHP9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_image['title'] >
	>
	type $mol_image__uri__DXAJJGRB = $mol_type_enforce<
		ReturnType< $mol_attach['item_uri'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	export class $mol_attach extends $mol_view {
		items( next?: readonly(string)[] ): readonly(string)[]
		sub( ): readonly(any)[]
		Add( ): $mol_button_open
		Item( id: any): $mol_button_minor
		content( ): readonly($mol_view)[]
		Content( ): $mol_row
		attach_title( ): string
		attach_new( next?: any ): any
		item_drop( id: any, next?: any ): any
		item_uri( id: any): string
		Image( id: any): $mol_image
	}
	
}

//# sourceMappingURL=attach.view.tree.d.ts.map