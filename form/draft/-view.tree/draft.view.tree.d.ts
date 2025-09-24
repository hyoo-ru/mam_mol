declare namespace $ {

	type $mol_button_major__title_mol_form_draft_1 = $mol_type_enforce<
		ReturnType< $mol_form_draft['submit_title'] >
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__hint_mol_form_draft_2 = $mol_type_enforce<
		ReturnType< $mol_form_draft['submit_hint'] >
		,
		ReturnType< $mol_button_major['hint'] >
	>
	type $mol_button_major__click_mol_form_draft_3 = $mol_type_enforce<
		ReturnType< $mol_form_draft['submit'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_minor__hint_mol_form_draft_4 = $mol_type_enforce<
		ReturnType< $mol_form_draft['reset_title'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__sub_mol_form_draft_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_mol_form_draft_6 = $mol_type_enforce<
		ReturnType< $mol_form_draft['reset'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_status__message_mol_form_draft_7 = $mol_type_enforce<
		ReturnType< $mol_form_draft['result'] >
		,
		ReturnType< $mol_status['message'] >
	>
	export class $mol_form_draft extends $mol_form {
		submit_title( ): string
		submit_hint( ): string
		Submit( ): $mol_button_major
		reset_title( ): string
		Reset_icon( ): $mol_icon_restore
		Reset( ): $mol_button_minor
		result( next?: string ): string
		Result( ): $mol_status
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
		message_done( ): string
		message_invalid( ): string
		buttons( ): readonly($mol_view)[]
	}
	
}

//# sourceMappingURL=draft.view.tree.d.ts.map