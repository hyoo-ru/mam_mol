declare namespace $ {

	type $mol_view__minimal_height__V86UDOZH = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub__I5F6ETT1 = $mol_type_enforce<
		ReturnType< $mol_labeler['label'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__minimal_height__BPX6QT8I = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub__K6CZM551 = $mol_type_enforce<
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