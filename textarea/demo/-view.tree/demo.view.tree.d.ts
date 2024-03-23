declare namespace $ {

	type $mol_textarea__sidebar_showed__H3V4P35E = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_textarea['sidebar_showed'] >
	>
	type $mol_textarea__hint__6217DV36 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_textarea['hint'] >
	>
	type $mol_textarea__value__O0VPM50H = $mol_type_enforce<
		ReturnType< $mol_textarea_demo['filled_descr'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_text__text__JLC8MGE0 = $mol_type_enforce<
		ReturnType< $mol_textarea_demo['symbols_hint'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_list__rows__KFS0N9ED = $mol_type_enforce<
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