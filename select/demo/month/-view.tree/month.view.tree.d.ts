declare namespace $ {

	type $mol_select__no_options_message__W8CZUS8A = $mol_type_enforce<
		string
		,
		ReturnType< $mol_select['no_options_message'] >
	>
	type $mol_select__value__A8JUXZ5P = $mol_type_enforce<
		ReturnType< $mol_select_demo_month['month'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_select__dictionary__8DJVI65Y = $mol_type_enforce<
		ReturnType< $mol_select_demo_month['months'] >
		,
		ReturnType< $mol_select['dictionary'] >
	>
	export class $mol_select_demo_month extends $mol_example_small {
		month( next?: string ): string
		months( ): ({ 
			'jan': string,
			'feb': string,
			'mar': string,
			'apr': string,
			'may': string,
			'jun': string,
			'jul': string,
			'aug': string,
			'sep': string,
			'oct': string,
			'nov': string,
			'dec': string,
		}) 
		Month( ): $mol_select
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=month.view.tree.d.ts.map