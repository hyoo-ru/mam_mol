namespace $ {
	export function $mol_view_tree_ts_merge(prop: $mol_tree) {
		return prop.make({ type: 'inline', sub: [
			prop.make({ data: '...super.' }),
			prop.make({
				data: prop.type.substring(1),
				col: prop.col + 1
			}),
			prop.make({ data: '()' }),
		] })
	}
}
