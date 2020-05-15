namespace $ {
	export function $mol_view_tree_ts_array(value: $mol_tree, prop_name: $mol_tree) {
		const type_node = value.make({
			data: value.type.substring(1),
			col: value.col + 1
		})

		return value.hack({
			'-': () => [],
			'^': (node, context) => [
				$mol_view_tree_ts_merge(value)
			],
			'': (node, context) => [
				$mol_view_tree_ts(value)
			]
		})

		// $mol_view_tree_ts(item)
	}
}
