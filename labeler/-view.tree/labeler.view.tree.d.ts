declare namespace $ {

	type $mol_view__minimal_height__0RVG3YAX = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub__DQ95FW3D = $mol_type_enforce<
		ReturnType< $mol_labeler['label'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__minimal_height__JDKG8O9U = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub__4C5IUH8U = $mol_type_enforce<
		ReturnType< $mol_labeler['content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_labeler extends $mol_list {
		label( ): readonly($mol_view_content)[]
		Label( ): $mol_view
		content( ): readonly(any)[]
		Content( ): $mol_view
		rows( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=labeler.view.tree.d.ts.map