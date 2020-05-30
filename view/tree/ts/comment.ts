namespace $ {
	export function $mol_view_tree_ts_comment(item: $mol_tree) {
		const comment = item.sub.length === 1 ? item.sub[0] : undefined

		return item.make_struct('inline', [
			item.make_data('// '),
			(comment ?? item).make_data(comment?.type ?? '')
		])
	}

	export function $mol_view_tree_ts_comment_doc(item: $mol_tree) {
		const chunks = item.toString().trim().split("\n")

		return item.make_struct('lines', [
			item.make_data('/**'),
			item.make_data(' * ```tree'),
			...chunks.map(chunk => item.make_data(' * ' + chunk)),
			item.make_data(' * ```'),
			item.make_data(' */'),
		])
	}
}
