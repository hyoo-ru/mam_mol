declare namespace $ {

	type $mol_search_jumper__query__SBIPRURG = $mol_type_enforce<
		ReturnType< $mol_text_demo['search'] >
		,
		ReturnType< $mol_search_jumper['query'] >
	>
	type $mol_search_jumper__Root__YEMQLHKP = $mol_type_enforce<
		ReturnType< $mol_text_demo['View'] >
		,
		ReturnType< $mol_search_jumper['Root'] >
	>
	type $mol_link__arg__EBANHOV1 = $mol_type_enforce<
		({ 
			'edit': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub__OI71S2VI = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_text__text__FECJ1AM4 = $mol_type_enforce<
		ReturnType< $mol_text_demo['text'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_text__highlight__M6PTDPPI = $mol_type_enforce<
		ReturnType< $mol_text_demo['search'] >
		,
		ReturnType< $mol_text['highlight'] >
	>
	type $mol_page__title__KRG0FTBS = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools__K0JLJGBJ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body__127825CL = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_link__arg__764BG3WB = $mol_type_enforce<
		({ 
			'edit': any,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub__WO3GB00P = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_textarea__value__A2KDHUJ7 = $mol_type_enforce<
		ReturnType< $mol_text_demo['text'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_page__title__13G1DD10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools__9R0SET94 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body__NAE3OJ7I = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_book2__Placeholder__HBQGNIFY = $mol_type_enforce<
		any
		,
		ReturnType< $mol_book2['Placeholder'] >
	>
	type $mol_book2__pages__0BCP60DM = $mol_type_enforce<
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