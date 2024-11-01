declare namespace $ {

	type $mol_search_jumper__query__9RZB7U8Z = $mol_type_enforce<
		ReturnType< $mol_text_demo['search'] >
		,
		ReturnType< $mol_search_jumper['query'] >
	>
	type $mol_search_jumper__Root__2TA6JR6B = $mol_type_enforce<
		ReturnType< $mol_text_demo['View'] >
		,
		ReturnType< $mol_search_jumper['Root'] >
	>
	type $mol_link__arg__N8C4OSHG = $mol_type_enforce<
		({ 
			'edit': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub__U5EAU4DF = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_text__text__UL6M5XVV = $mol_type_enforce<
		ReturnType< $mol_text_demo['text'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_text__highlight__S8Y7NS97 = $mol_type_enforce<
		ReturnType< $mol_text_demo['search'] >
		,
		ReturnType< $mol_text['highlight'] >
	>
	type $mol_page__title__XVQOPFUN = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools__Y2J80MRB = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body__PCE90MQO = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_link__arg__0L52R5HS = $mol_type_enforce<
		({ 
			'edit': any,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub__F723800F = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_textarea__value__JIXVOPGJ = $mol_type_enforce<
		ReturnType< $mol_text_demo['text'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_page__title__AVNXAC1R = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools__HGCUE2DO = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body__F9U6ZKQ5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_book2__Placeholder__NLGH0P7O = $mol_type_enforce<
		any
		,
		ReturnType< $mol_book2['Placeholder'] >
	>
	type $mol_book2__pages__QW3AZ7SN = $mol_type_enforce<
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