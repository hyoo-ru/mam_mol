declare namespace $ {

	type $mol_search_jumper__query__W7115138 = $mol_type_enforce<
		ReturnType< $mol_text_demo['search'] >
		,
		ReturnType< $mol_search_jumper['query'] >
	>
	type $mol_search_jumper__Root__8NHYDJ6O = $mol_type_enforce<
		ReturnType< $mol_text_demo['View'] >
		,
		ReturnType< $mol_search_jumper['Root'] >
	>
	type $mol_link__arg__1A5BTH0F = $mol_type_enforce<
		({ 
			'edit': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub__02WOAGWK = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_text__text__G0J3FARP = $mol_type_enforce<
		ReturnType< $mol_text_demo['text'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_text__highlight__7Z13TGVK = $mol_type_enforce<
		ReturnType< $mol_text_demo['search'] >
		,
		ReturnType< $mol_text['highlight'] >
	>
	type $mol_page__title__OUXCQFUP = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools__YTWKRNQ0 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body__IMC1SSC4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_link__arg__NGK935H5 = $mol_type_enforce<
		({ 
			'edit': any,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub__IPB9BXID = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_textarea__value__QGM2L48N = $mol_type_enforce<
		ReturnType< $mol_text_demo['text'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_page__title__L2V6X39U = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools__FQ3QH4NT = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body__IUZ56BV3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_book2__Placeholder__YSOZ4E78 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_book2['Placeholder'] >
	>
	type $mol_book2__pages__MVJVRWO4 = $mol_type_enforce<
		ReturnType< $mol_text_demo['pages'] >
		,
		ReturnType< $mol_book2['pages'] >
	>
	export class $mol_text_demo extends $mol_example_large {
		search( next?: string ): string
		Search( ): $mol_search_jumper
		Edit_icon( ): $mol_icon_pencil
		Edit( ): $mol_link
		View( ): $mol_text
		View_page( ): $mol_page
		Close_icon( ): $mol_icon_close
		Close( ): $mol_link
		text( next?: string ): string
		Code( ): $mol_textarea
		Code_page( ): $mol_page
		pages( ): readonly(any)[]
		Book( ): $mol_book2
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map