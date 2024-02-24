declare namespace $ {

	type $mol_link_source__uri__FBY55A6T = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link_source['uri'] >
	>
	type $mol_list__rows__NFYKPDT9 = $mol_type_enforce<
		ReturnType< $mol_app_questions['menu_rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_link__uri__DUMJL71Q = $mol_type_enforce<
		ReturnType< $mol_app_questions['question_permalink'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__sub__E27QH95R = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__sub__JZELORET = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__arg__DQ2VX5CE = $mol_type_enforce<
		({ 
			'question': any,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_text__text__EFW2N9WB = $mol_type_enforce<
		ReturnType< $mol_app_questions['question_descr'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_list__rows__6BMTRUFJ = $mol_type_enforce<
		ReturnType< $mol_app_questions['answers'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_view__sub__Z626Z3K6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub__161O18F3 = $mol_type_enforce<
		ReturnType< $mol_app_questions['question_tags_by_index'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_page__title__1VWXH00U = $mol_type_enforce<
		ReturnType< $mol_app_questions['title_default'] >
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools__42E1SWOD = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body__UB1ZZC3Y = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__title__H6PZXX9E = $mol_type_enforce<
		ReturnType< $mol_app_questions['question_title'] >
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools__TI1HB9KA = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body__FAVMZO61 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_text__text__HDE23TMZ = $mol_type_enforce<
		ReturnType< $mol_app_questions['question_answer'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_link__minimal_width__UW8QYGNW = $mol_type_enforce<
		number
		,
		ReturnType< $mol_link['minimal_width'] >
	>
	type $mol_link__minimal_height__TTRGFUF2 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_link['minimal_height'] >
	>
	type $mol_link__arg__RXPNMW11 = $mol_type_enforce<
		ReturnType< $mol_app_questions['question_arg_by_index'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub__WJHFS85S = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_view__sub__WYXAIQZM = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_app_questions extends $mol_book2 {
		Themme( ): $mol_theme_auto
		title_default( ): string
		Lights( ): $mol_lights_toggle
		Source_link( ): $mol_link_source
		menu_rows( ): readonly(any)[]
		Menu_links( ): $mol_list
		question_title( id: any): string
		question_permalink( id: any): string
		Details_permalink_icon( id: any): $mol_icon_external
		Details_permalink( id: any): $mol_link
		Details_close_icon( id: any): $mol_icon_cross
		Details_close( id: any): $mol_link
		question_descr( id: any): string
		Details_descr( id: any): $mol_text
		answers( id: any): readonly(any)[]
		Answers( id: any): $mol_list
		question_answer( id: any): string
		question_arg_by_index( id: any): Record<string, any>
		question_title_by_index( id: any): string
		Question_title( id: any): $mol_view
		question_tags_by_index( id: any): readonly(any)[]
		Question_tags( id: any): $mol_view
		tag_name( id: any): string
		plugins( ): readonly(any)[]
		Menu( ): $mol_page
		Details( id: any): $mol_page
		Answer( id: any): $mol_text
		Question_link( id: any): $mol_link
		Tag( id: any): $mol_view
	}
	
}

//# sourceMappingURL=questions.view.tree.d.ts.map