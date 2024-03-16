declare namespace $ {

	type $mol_textarea__sidebar_showed__63YGSCFM = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_textarea['sidebar_showed'] >
	>
	type $mol_textarea__hint__E5LMSZ5R = $mol_type_enforce<
		string
		,
		ReturnType< $mol_textarea['hint'] >
	>
	type $mol_textarea__value__IO9EF6OP = $mol_type_enforce<
		ReturnType< $mol_textarea_demo['filled_descr'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_text__text__OIKKJGUW = $mol_type_enforce<
		ReturnType< $mol_textarea_demo['symbols_hint'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_list__rows__QD266KEY = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_textarea_demo extends $mol_example {
		filled_descr( next?: string ): string
		Filled_descr( ): $mol_textarea
		symbols_hint( ): string
		Disabled( ): $mol_text
		Content( ): $mol_list
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map