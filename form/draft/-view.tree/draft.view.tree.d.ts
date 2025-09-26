declare namespace $ {

	type $mol_button_minor__hint_mol_form_draft_1 = $mol_type_enforce<
		ReturnType< $mol_form_draft['reset_title'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__sub_mol_form_draft_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_mol_form_draft_3 = $mol_type_enforce<
		ReturnType< $mol_form_draft['reset'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	export class $mol_form_draft extends $mol_form {
		reset_title( ): string
		Reset_icon( ): $mol_icon_restore
		Reset( ): $mol_button_minor
		model( ): $mol_object2
		changed( ): boolean
		state( ): Record<string, any>
		value( id: any, next?: any ): any
		value_str( id: any, next?: string ): string
		value_bool( id: any, next?: boolean ): boolean
		value_number( id: any, next?: number ): number
		dictionary_bool( id: any, next?: Record<string, any> ): Record<string, any>
		list_string( id: any, next?: readonly(string)[] ): readonly(string)[]
		value_changed( id: any): boolean
		reset( next?: any ): any
		done( next?: any ): any
		buttons( ): readonly($mol_view)[]
	}
	
}

//# sourceMappingURL=draft.view.tree.d.ts.map