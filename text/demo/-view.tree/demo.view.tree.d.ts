declare namespace $ {

	type $mol_search_jumper__query__UUUOBM1T = $mol_type_enforce<
		ReturnType< $mol_text_demo['search'] >
		,
		ReturnType< $mol_search_jumper['query'] >
	>
	type $mol_search_jumper__Root__0CEKWN4K = $mol_type_enforce<
		ReturnType< $mol_text_demo['View'] >
		,
		ReturnType< $mol_search_jumper['Root'] >
	>
	type $mol_link__arg__MVV4YOIZ = $mol_type_enforce<
		({ 
			'edit': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub__3ZDYJHJR = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_text__text__2U0J91V0 = $mol_type_enforce<
		ReturnType< $mol_text_demo['text'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_text__highlight__ATJ3UATE = $mol_type_enforce<
		ReturnType< $mol_text_demo['search'] >
		,
		ReturnType< $mol_text['highlight'] >
	>
	type $mol_page__title__LOAXY0FN = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools__I0RLZLSB = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body__Q5VVAZVY = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_link__arg__S4CEKK5Z = $mol_type_enforce<
		({ 
			'edit': any,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub__BQPWJCJZ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_textarea__value__IRM9ZFY2 = $mol_type_enforce<
		ReturnType< $mol_text_demo['text'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_page__title__HMO41DN2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools__W1BRYDWQ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body__704YW6Y3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_book2__Placeholder__EZNY6RX0 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_book2['Placeholder'] >
	>
	type $mol_book2__pages__IXSY6OY3 = $mol_type_enforce<
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