declare namespace $ {

	type $mol_html_view_heading__level__4GESTCS4 = $mol_type_enforce<
		ReturnType< $mol_html_view['heading_level'] >
		,
		ReturnType< $mol_html_view_heading['level'] >
	>
	type $mol_html_view_heading__sub__LT07ZVR8 = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_html_view_heading['sub'] >
	>
	type $mol_paragraph__sub__JGQ09ZLR = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_list__rows__7HVAI4WF = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_list__rows__E48KH6I2 = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_paragraph__sub__6V7P8I2C = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_paragraph__sub__HGS3XS7H = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_paragraph__sub__Z3DAUEU1 = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_paragraph__sub__4YFIJPUT = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_view__sub__4IJPLGMN = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub__80QCOYFR = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_paragraph__sub__JWD18QQN = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_link_iconed__uri__0WAJ54Y6 = $mol_type_enforce<
		ReturnType< $mol_html_view['link_uri'] >
		,
		ReturnType< $mol_link_iconed['uri'] >
	>
	type $mol_link_iconed__content__P79GM6MV = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_link_iconed['content'] >
	>
	type $mol_image__uri__S98CM543 = $mol_type_enforce<
		ReturnType< $mol_html_view['image_uri'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_paragraph__sub__I8SI1OJ0 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_dimmer__needle__KTPLG2XS = $mol_type_enforce<
		ReturnType< $mol_html_view['highlight'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_dimmer__haystack__60NAXG21 = $mol_type_enforce<
		ReturnType< $mol_html_view['text'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	export class $mol_html_view extends $mol_list {
		heading_level( id: any): number
		content( id: any): readonly(any)[]
		link_uri( id: any): string
		image_uri( id: any): string
		highlight( ): string
		text( id: any): string
		html( ): string
		dom( ): any
		safe_link( id: any): string
		views( id: any): readonly(any)[]
		xss_uri( ): string
		Heading( id: any): $mol_html_view_heading
		Paragraph( id: any): $mol_paragraph
		List( id: any): $mol_list
		Quote( id: any): $mol_list
		Strong( id: any): $mol_paragraph
		Emphasis( id: any): $mol_paragraph
		Deleted( id: any): $mol_paragraph
		Inserted( id: any): $mol_paragraph
		Subscript( id: any): $mol_view
		Superscript( id: any): $mol_view
		Code( id: any): $mol_paragraph
		Link( id: any): $mol_link_iconed
		Image( id: any): $mol_image
		Break( id: any): $mol_paragraph
		Text( id: any): $mol_dimmer
	}
	
	export class $mol_html_view_heading extends $mol_paragraph {
		level( ): number
		attr( ): ({ 
			'mol_html_view_heading': ReturnType< $mol_html_view_heading['level'] >,
		})  & ReturnType< $mol_paragraph['attr'] >
	}
	
}

//# sourceMappingURL=view.view.tree.d.ts.map