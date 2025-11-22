namespace $ {
	type Primitive = string | number | boolean

	export type $mol_form_draft_state_value = readonly Primitive[] | Primitive | Record<string, boolean>

	export type $mol_form_draft_state = Record< string, $mol_form_draft_state_value | null > | null

}
