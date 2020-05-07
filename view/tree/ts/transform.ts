namespace $ {

	export function $mol_view_tree_ts_transform(tree: $mol_tree) {
		const flat_module = tree.hack({
			'-': remove_comment,
			'': $mol_view_tree_ts_transform_flatten_props
		})

		// const locales: Record<string, string> = {}

		return [
			tree.make({ data: 'namespace $ {' }),
			flat_module.hack({
				'': (cn, context) => [
					cn.make({ data: 'export class' }),
					cn.make({ data: cn.type  }),
					cn.make({ data: 'extends'  }),
					cn.sub[0].make({ sub: [] }),
					cn.make({ data: '{' }),
					...cn.sub[0].sub.slice(1),
					cn.make({ data: '}' }),
				]
			}),
			tree.make({ data: '}' }),
		]
	}

	function remove_comment(): readonly $mol_tree[] {
		return [ ]
	}
}
