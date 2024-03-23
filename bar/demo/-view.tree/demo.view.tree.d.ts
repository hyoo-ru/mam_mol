declare namespace $ {

	type $mol_string__hint__FRTQXXRY = $mol_type_enforce<
		ReturnType< $mol_bar_demo['mail_hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value__VOYGDFYT = $mol_type_enforce<
		ReturnType< $mol_bar_demo['mail'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_button_minor__title__IE7A6B71 = $mol_type_enforce<
		ReturnType< $mol_bar_demo['submit_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_bar__sub__K63SCQGK = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_bar['sub'] >
	>
	type $mol_string__hint__74MMDBUK = $mol_type_enforce<
		ReturnType< $mol_bar_demo['mail_hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value__K54UZNAT = $mol_type_enforce<
		ReturnType< $mol_bar_demo['mail'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_check_box__title__UA8NX3BD = $mol_type_enforce<
		ReturnType< $mol_bar_demo['confirm_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked__N47A1TF0 = $mol_type_enforce<
		ReturnType< $mol_bar_demo['confirmed'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_bar__sub__ZZOF8N08 = $mol_type_enforce<
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