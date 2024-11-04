declare namespace $ {

	type $mol_html_view_heading__level__P1OOLQFE = $mol_type_enforce<
		ReturnType< $mol_html_view['heading_level'] >
		,
		ReturnType< $mol_html_view_heading['level'] >
	>
	type $mol_html_view_heading__sub__KKRHF5ZV = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_html_view_heading['sub'] >
	>
	type $mol_paragraph__sub__0SBUFSUH = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_list__rows__FVB2VL0K = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_list__rows__F5Q6BTYM = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_paragraph__sub__Q6NZ1PHG = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_paragraph__sub__KS40DY4N = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_paragraph__sub__3Z64484P = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_paragraph__sub__XO4VADKG = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_view__sub__PJPFM6KQ = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub__MGH4BQFJ = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_paragraph__sub__OYL6M3A0 = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_link_iconed__uri__GG1ROOGV = $mol_type_enforce<
		ReturnType< $mol_html_view['link_uri'] >
		,
		ReturnType< $mol_link_iconed['uri'] >
	>
	type $mol_link_iconed__content__J7D7G89C = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_link_iconed['content'] >
	>
	type $mol_image__uri__IQ9I32VG = $mol_type_enforce<
		ReturnType< $mol_html_view['image_uri'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_paragraph__sub__8I17RZ8M = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_dimmer__needle__JGK8O6HT = $mol_type_enforce<
		ReturnType< $mol_html_view['highlight'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_dimmer__haystack__TXIDI65A = $mol_type_enforce<
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