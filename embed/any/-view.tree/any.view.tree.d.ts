declare namespace $ {

	type $mol_image__title__JZU9Q5HP = $mol_type_enforce<
		ReturnType< $mol_embed_any['title'] >
		,
		ReturnType< $mol_image['title'] >
	>
	type $mol_image__uri__YQUYXDZH = $mol_type_enforce<
		ReturnType< $mol_embed_any['uri'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_embed_native__title__RLE00G7B = $mol_type_enforce<
		ReturnType< $mol_embed_any['title'] >
		,
		ReturnType< $mol_embed_native['title'] >
	>
	type $mol_embed_native__uri__3N91HJ2D = $mol_type_enforce<
		ReturnType< $mol_embed_any['uri'] >
		,
		ReturnType< $mol_embed_native['uri'] >
	>
	type $mol_embed_youtube__title__Y84RH95J = $mol_type_enforce<
		ReturnType< $mol_embed_any['title'] >
		,
		ReturnType< $mol_embed_youtube['title'] >
	>
	type $mol_embed_youtube__uri__N2GLKIL6 = $mol_type_enforce<
		ReturnType< $mol_embed_any['uri'] >
		,
		ReturnType< $mol_embed_youtube['uri'] >
	>
	type $mol_embed_rutube__title__Z2DNZNWJ = $mol_type_enforce<
		ReturnType< $mol_embed_any['title'] >
		,
		ReturnType< $mol_embed_rutube['title'] >
	>
	type $mol_embed_rutube__uri__TD2ASKOH = $mol_type_enforce<
		ReturnType< $mol_embed_any['uri'] >
		,
		ReturnType< $mol_embed_rutube['uri'] >
	>
	export class $mol_embed_any extends $mol_view {
		title( ): string
		uri( ): string
		Image( ): $mol_image
		Object( ): $mol_embed_native
		Youtube( ): $mol_embed_youtube
		Rutube( ): $mol_embed_rutube
	}
	
}

//# sourceMappingURL=any.view.tree.d.ts.map