namespace $ {
	export function $mol_view_tree2_ts_comment(this: $, item: $mol_tree2) {
		return $mol_tree2.struct('lines', item.kids.map(chunk => item.data('// ' + chunk.type)))
	}

	export function $mol_view_tree2_ts_comment_doc(this: $, item: $mol_tree2) {
		const chunks = item.toString().trim().split('\n')

		return item.struct('lines', [
			item.data(''),
			item.data('/**'),
			item.data(' * ```tree'),
			...chunks.map(chunk => item.data(' * ' + chunk)),
			item.data(' * ```'),
			item.data(' */'),
		])
	}
}
