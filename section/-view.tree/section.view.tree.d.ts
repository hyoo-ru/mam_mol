declare namespace $ {

	type $mol_paragraph__dom_name__OITP2YEY = $mol_type_enforce<
		ReturnType< $mol_section['title_dom_name'] >
		,
		ReturnType< $mol_paragraph['dom_name'] >
	>
	type $mol_paragraph__title__8WUM3I23 = $mol_type_enforce<
		ReturnType< $mol_section['title'] >
		,
		ReturnType< $mol_paragraph['title'] >
	>
	type $mol_view__sub__KAJL9ALZ = $mol_type_enforce<
		ReturnType< $mol_section['tools'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub__T7ONR48J = $mol_type_enforce<
		ReturnType< $mol_section['head'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_list__rows__6R38THQ1 = $mol_type_enforce<
		ReturnType< $mol_section['content'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_section extends $mol_list {
		title_dom_name( ): string
		Title( ): $mol_paragraph
		tools( ): readonly(any)[]
		Tools( ): $mol_view
		head( ): readonly(any)[]
		Head( ): $mol_view
		content( ): readonly(any)[]
		Content( ): $mol_list
		level( ): number
		rows( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=section.view.tree.d.ts.map