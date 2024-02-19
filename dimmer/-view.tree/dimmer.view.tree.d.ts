declare namespace $ {

	type $mol_paragraph__sub__4HVC52A0 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_paragraph__sub__ZWOLRC3H = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	export class $mol_dimmer extends $mol_paragraph {
		haystack( ): string
		needle( ): string
		sub( ): ReturnType< $mol_dimmer['parts'] >
		Low( id: any): $mol_paragraph
		High( id: any): $mol_paragraph
		parts( ): readonly($mol_view_content)[]
		string( id: any): string
	}
	
}

//# sourceMappingURL=dimmer.view.tree.d.ts.map