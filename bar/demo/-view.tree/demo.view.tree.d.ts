declare namespace $ {

	type $mol_string__hint__2A8K58ZI = $mol_type_enforce<
		ReturnType< $mol_bar_demo['mail_hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value__CVY9F445 = $mol_type_enforce<
		ReturnType< $mol_bar_demo['mail'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_button_minor__title__P895TDD2 = $mol_type_enforce<
		ReturnType< $mol_bar_demo['submit_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_bar__sub__4SQDG2SK = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_bar['sub'] >
	>
	type $mol_string__hint__6VM62N0A = $mol_type_enforce<
		ReturnType< $mol_bar_demo['mail_hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value__M2KYDGVN = $mol_type_enforce<
		ReturnType< $mol_bar_demo['mail'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_check_box__title__9NFX8XKR = $mol_type_enforce<
		ReturnType< $mol_bar_demo['confirm_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked__679VK2AL = $mol_type_enforce<
		ReturnType< $mol_bar_demo['confirmed'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_bar__sub__V2BGF29E = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_bar['sub'] >
	>
	export class $mol_bar_demo extends $mol_example_small {
		mail_hint( ): string
		mail( next?: string ): string
		Two_mail( ): $mol_string
		submit_title( ): string
		Two_submit( ): $mol_button_minor
		Two( ): $mol_bar
		Three_mail( ): $mol_string
		confirm_title( ): string
		confirmed( next?: boolean ): boolean
		Three_confirm( ): $mol_check_box
		Three( ): $mol_bar
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map