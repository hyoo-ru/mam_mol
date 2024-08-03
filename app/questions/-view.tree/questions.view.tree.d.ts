declare namespace $ {

	type $mol_link_source__uri__G548GP3U = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link_source['uri'] >
	>
	type $mol_list__rows__2ABMC0KN = $mol_type_enforce<
		ReturnType< $mol_app_questions['menu_rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_link__uri__AKXAFVMJ = $mol_type_enforce<
		ReturnType< $mol_app_questions['question_permalink'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__sub__N970CLDR = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__sub__2O4HWM17 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__arg__N2G83WWZ = $mol_type_enforce<
		({ 
			'question': any,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_text__text__A9WEW6DW = $mol_type_enforce<
		ReturnType< $mol_app_questions['question_descr'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_list__rows__QHCIZZ5E = $mol_type_enforce<
		ReturnType< $mol_app_questions['answers'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_view__sub__XKNGJIU7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub__534FD9ZW = $mol_type_enforce<
		ReturnType< $mol_app_questions['question_tags_by_index'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_page__title__E3QWXBQM = $mol_type_enforce<
		ReturnType< $mol_app_questions['title_default'] >
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools__M96QAHHL = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body__9LH5CA6H = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__title__OVPRRYGL = $mol_type_enforce<
		ReturnType< $mol_app_questions['question_title'] >
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools__VYPO8Y3X = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body__NWR9L6S8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_text__text__1OABDHIO = $mol_type_enforce<
		ReturnType< $mol_app_questions['question_answer'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_link__minimal_width__JHI0FQA1 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_link['minimal_width'] >
	>
	type $mol_link__minimal_height__HEC3BU82 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_link['minimal_height'] >
	>
	type $mol_link__arg__NN2MPGRE = $mol_type_enforce<
		ReturnType< $mol_app_questions['question_arg_by_index'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub__RTFJFSHE = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_view__sub__80TRUPDH = $mol_type_enforce<
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
		Details_close_icon( id: any): $mol_icon_close
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