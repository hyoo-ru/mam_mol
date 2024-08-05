declare namespace $ {

	type $mol_search_jumper_forward__NOYDM6RI = $mol_type_enforce<
		Parameters< $mol_search_jumper['forward'] >[0]
		,
		Parameters< ReturnType< $mol_search_jumper['Index'] >['forward'] >[0]
	>
	type $mol_search_jumper_backward__51KR4GZ4 = $mol_type_enforce<
		Parameters< $mol_search_jumper['backward'] >[0]
		,
		Parameters< ReturnType< $mol_search_jumper['Index'] >['backward'] >[0]
	>
	type $mol_hotkey__mod_shift__GFMZ7PFW = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_hotkey['mod_shift'] >
	>
	type $mol_hotkey__key__ZM2OZ7QE = $mol_type_enforce<
		({ 
			enter( next?: ReturnType< $mol_search_jumper['backward'] > ): ReturnType< $mol_search_jumper['backward'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	type $mol_hotkey__key__UWGR6PW1 = $mol_type_enforce<
		({ 
			enter( next?: ReturnType< $mol_search_jumper['forward'] > ): ReturnType< $mol_search_jumper['forward'] >,
			escape( next?: ReturnType< $mol_search_jumper['escape'] > ): ReturnType< $mol_search_jumper['escape'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	type $mol_paginator__value__GOUBXIW8 = $mol_type_enforce<
		ReturnType< $mol_search_jumper['index'] >
		,
		ReturnType< $mol_paginator['value'] >
	>
	export class $mol_search_jumper extends $mol_search {
		index( next?: number ): number
		forward( next?: ReturnType< ReturnType< $mol_search_jumper['Index'] >['forward'] > ): ReturnType< ReturnType< $mol_search_jumper['Index'] >['forward'] >
		backward( next?: ReturnType< ReturnType< $mol_search_jumper['Index'] >['backward'] > ): ReturnType< ReturnType< $mol_search_jumper['Index'] >['backward'] >
		Backward( ): $mol_hotkey
		escape( next?: any ): any
		Forward( ): $mol_hotkey
		Root( ): $mol_view
		Index( ): $mol_paginator
		plugins( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=jumper.view.tree.d.ts.map