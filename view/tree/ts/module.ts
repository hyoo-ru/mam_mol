namespace $ {
	export function $mol_view_tree_ts_module(tree_module: $mol_tree) {
		const locales: Record<string, string> = {}

		const node = tree_module.make({ sub: [
			tree_module.make({ data: 'namespace $ {'}),

			...tree_module.sub.map(
				class_node => class_node.type === '-'
					? undefined
					: $mol_view_tree_ts_class_node(
						class_node,
						$mol_view_tree_ts_locale_create({ class_node, locales })
					)
			).filter($mol_guard_defined),

			tree_module.make({ data: '}'}),
		] })

		return { node, locales }
	}
}
