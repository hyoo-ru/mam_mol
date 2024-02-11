declare namespace $ {

	type $mol_paragraph__sub__ACTX2727 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_paragraph__sub__UJ00FS5O = $mol_type_enforce<
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