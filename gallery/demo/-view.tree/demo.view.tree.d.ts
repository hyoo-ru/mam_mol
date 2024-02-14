declare namespace $ {

	type $mol_stack__sub__2INYPEH3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_stack['sub'] >
	>
	type $mol_gallery__items__4VHL6HNP = $mol_type_enforce<
		ReturnType< $mol_gallery_demo['items'] >
		,
		ReturnType< $mol_gallery['items'] >
	>
	type $mol_avatar__id__ZDHK90AQ = $mol_type_enforce<
		ReturnType< $mol_gallery_demo['item_title'] >
		,
		ReturnType< $mol_avatar['id'] >
	>
	export class $mol_gallery_demo extends $mol_example {
		title( ): string
		count( ): number
		sub( ): readonly(any)[]
		Item( id: any): $mol_stack
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
		items( ): readonly(any)[]
		App( ): $mol_gallery
		item_title( id: any): string
		Item_image( id: any): $mol_avatar
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map