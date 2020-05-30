namespace $ {
	export function $mol_view_tree_ts_comment(item: $mol_tree2) {
		const comment = item.kids.length === 1 ? item.kids[0] : undefined

		return $mol_tree2.struct('inline', [
			item.data('// '),
			(comment ?? item).data(comment?.type ?? '')
		])
	}

	export function $mol_view_tree_ts_comment_doc(item: $mol_tree2) {
		const chunks = item.toString().trim().split("\n")

		return $mol_tree2.struct('lines', [
			item.data(''),
			item.data('/**'),
			item.data(' * ```tree'),
			...chunks.map(chunk => item.data(' * ' + chunk)),
			item.data(' * ```'),
			item.data(' */'),
		])
	}
}
