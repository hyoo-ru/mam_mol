namespace $ {
	export function $mol_view_tree2_comment(this: $mol_ambient_context, item: $mol_tree2) {
		const comment = item.kids.length === 1 ? item.kids[0] : undefined
		const sub = [ item.data('// ') ]
		if (comment) sub.push(comment.data(comment.type))

		return $mol_tree2.struct('inline', sub)
	}

	export function $mol_view_tree2_comment_doc(this: $mol_ambient_context, item: $mol_tree2) {
		const chunks = item.toString().trim().split('\n')

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
