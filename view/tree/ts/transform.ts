namespace $ {

	export function $mol_view_tree_ts_transform(tree: $mol_tree) {
		const flat_module = tree.hack({
			'-': remove_comment,
			'': $mol_view_tree_ts_transform_flatten_props
		})

		// const locales: Record<string, string> = {}

		return [
			tree.clone({ value: 'namespace $ {', sub: []}),
			flat_module.hack({
				'': (cn, context) => [
					cn.clone({ type: '', data: 'export class', sub: [] }),
					cn.clone({ sub: [] }),
					cn.clone({ value: 'extends', sub: [] }),
					cn.sub[0].clone({ sub: [] }),
					cn.clone({ value: '{', sub: []}),
					...cn.sub[0].sub.slice(1),
					cn.clone({ value: '}', sub: []}),
				]
			}),
			tree.clone({ value: '}', sub: [] }),
		]
	}

	function remove_comment(): readonly $mol_tree[] {
		return [ ]
	}
}
