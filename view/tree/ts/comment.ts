namespace $ {
	export function $mol_view_tree_ts_comment(cn: $mol_tree) {
		return cn.make({ type: 'line', sub: [
			cn.make({ data: '//'}),
			cn.make({ data: cn.data, col: cn.col + 1})
		]})
	}
}
