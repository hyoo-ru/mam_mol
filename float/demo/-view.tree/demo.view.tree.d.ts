declare namespace $ {

	type $mol_paragraph__title__A5XIZVV6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_paragraph['title'] >
	>
	type $mol_row__sub__JENVI845 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_float__sub__P3BFHQ8T = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_float['sub'] >
	>
	type $mol_list__rows__4M26YDYB = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_scroll__sub__ZOMH9BP2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	export class $mol_float_demo extends $mol_example_large {
		Head_content( ): $mol_paragraph
		Head_row( ): $mol_row
		Head( ): $mol_float
		Filler1( ): $mol_filler
		Filler2( ): $mol_filler
		Content( ): $mol_list
		Scroll( ): $mol_scroll
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map