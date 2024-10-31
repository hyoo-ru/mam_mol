declare namespace $ {

	type $mol_search__query__DEON9578 = $mol_type_enforce<
		ReturnType< $mol_code['value'] >
		,
		ReturnType< $mol_search['query'] >
	>
	type $mol_search__hint__XMJJGKW6 = $mol_type_enforce<
		ReturnType< $mol_code['hint'] >
		,
		ReturnType< $mol_search['hint'] >
	>
	type $mol_button__event_click__HT6T07LH = $mol_type_enforce<
		ReturnType< $mol_code['event_scan'] >
		,
		ReturnType< $mol_button['event_click'] >
	>
	type $mol_button__sub__GWM9M867 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	export class $mol_code extends $mol_view {
		value( next?: string ): string
		format( ): string
		hint( ): ReturnType< $mol_code['format'] >
		Manual( ): $mol_search
		event_scan( next?: any ): any
		scan_label( ): string
		Scan( ): $mol_button
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=code.view.tree.d.ts.map