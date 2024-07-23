declare namespace $ {

	type $mol_svg_rect__width__E4MNTAY5 = $mol_type_enforce<
		ReturnType< $mol_svg_text_box['box_width'] >
		,
		ReturnType< $mol_svg_rect['width'] >
	>
	type $mol_svg_rect__height__2CEDSRYW = $mol_type_enforce<
		ReturnType< $mol_svg_text_box['box_height'] >
		,
		ReturnType< $mol_svg_rect['height'] >
	>
	type $mol_svg_rect__pos__0ONHITDJ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_svg_rect['pos'] >
	>
	type $mol_svg_text__pos__0PWOVTX7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_svg_text['pos'] >
	>
	type $mol_svg_text__align__425WOARE = $mol_type_enforce<
		ReturnType< $mol_svg_text_box['align'] >
		,
		ReturnType< $mol_svg_text['align'] >
	>
	type $mol_svg_text__sub__Q89TZXYJ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_svg_text['sub'] >
	>
	export class $mol_svg_text_box extends $mol_svg_group {
		box_width( ): string
		box_height( ): string
		box_pos_x( ): ReturnType< $mol_svg_text_box['pos_x'] >
		box_pos_y( ): string
		Back( ): $mol_svg_rect
		pos_x( ): string
		pos_y( ): string
		align( ): string
		text( ): string
		Text( ): $mol_svg_text
		font_size( ): number
		width( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=box.view.tree.d.ts.map