declare namespace $ {

	type $mol_image__title__DT1A2U43 = $mol_type_enforce<
		ReturnType< $mol_embed_youtube['title'] >
		,
		ReturnType< $mol_image['title'] >
	>
	type $mol_image__uri__HBLWX1CI = $mol_type_enforce<
		ReturnType< $mol_embed_youtube['video_preview'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_frame__title__JEXLEA82 = $mol_type_enforce<
		ReturnType< $mol_embed_youtube['title'] >
		,
		ReturnType< $mol_frame['title'] >
	>
	type $mol_frame__uri__DJ3CLR8R = $mol_type_enforce<
		ReturnType< $mol_embed_youtube['video_embed'] >
		,
		ReturnType< $mol_frame['uri'] >
	>
	export class $mol_embed_youtube extends $mol_check {
		active( next?: boolean ): boolean
		title( ): string
		video_preview( ): string
		Image( ): $mol_image
		Hint( ): $mol_icon_youtube
		video_embed( ): string
		Frame( ): $mol_frame
		uri( ): string
		video_id( ): string
		checked( next?: ReturnType< $mol_embed_youtube['active'] > ): ReturnType< $mol_embed_youtube['active'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=youtube.view.tree.d.ts.map