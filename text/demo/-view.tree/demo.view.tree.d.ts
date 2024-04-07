declare namespace $ {

	type $mol_search_jumper__query__P1TPUL70 = $mol_type_enforce<
		ReturnType< $mol_text_demo['search'] >
		,
		ReturnType< $mol_search_jumper['query'] >
	>
	type $mol_search_jumper__Root__IE0YQP5D = $mol_type_enforce<
		ReturnType< $mol_text_demo['View'] >
		,
		ReturnType< $mol_search_jumper['Root'] >
	>
	type $mol_link__arg__V1ZJKTJD = $mol_type_enforce<
		({ 
			'edit': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub__96OKLBVV = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_text__text__WAPSGWFY = $mol_type_enforce<
		ReturnType< $mol_text_demo['text'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_text__highlight__HZ695VU6 = $mol_type_enforce<
		ReturnType< $mol_text_demo['search'] >
		,
		ReturnType< $mol_text['highlight'] >
	>
	type $mol_page__title__7IBG9NXO = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools__P33M2Y2H = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body__K6QQPGO0 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_link__arg__9273ICK4 = $mol_type_enforce<
		({ 
			'edit': any,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub__VN7CUDT9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_textarea__value__EYYOKRJC = $mol_type_enforce<
		ReturnType< $mol_text_demo['text'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_page__title__1NZUSQNV = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools__KY4FIJ6N = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body__SBXJXIOV = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_book2__Placeholder__2E7ZW5IK = $mol_type_enforce<
		any
		,
		ReturnType< $mol_book2['Placeholder'] >
	>
	type $mol_book2__pages__CY5F378S = $mol_type_enforce<
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
		Close_icon( ): $mol_icon_cross
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