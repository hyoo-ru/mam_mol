namespace $ {

	export function $mol_view_tree_ts_transform(tree: $mol_tree) {
		const flat_module = tree.hack({
			'-': remove_comment,
			'': $mol_view_tree_ts_transform_flatten_props
		})

		// const locales: Record<string, string> = {}

		return new $mol_tree({
			type: 'namespace',
			sub: [
				tree.clone({
					type: '$ {',
					sub: [],
				}),
				flat_module.hack({
					'': (class_node, context) => [
						class_node.clone({
							type: `export class`,
							sub: [],
						}),
						class_node.clone({
							sub: []
						}),
						class_node.clone({
							type: 'extends',
							sub: []
						}),
						class_node.sub[0].clone({
							sub: []
						}),
						class_node.clone({
							type: '{',
							sub: []
						}),
						...class_node.sub[0].sub.slice(1),
						class_node.clone({
							type: '}',
							sub: []
						}),
					]
				}),
				tree.clone({
					type: '}',
					sub: []
				}),
			]
		})
		
	}
	function remove_comment(): readonly $mol_tree[] {
		return [ ]
	}
}
