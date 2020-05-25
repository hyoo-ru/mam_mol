namespace $ {
	export function $mol_view_tree_ts_comment(item: $mol_tree) {
		return item.make_struct('line', [
			item.make_data('//'),
			item.make_data(item.value)
		])
	}
}
