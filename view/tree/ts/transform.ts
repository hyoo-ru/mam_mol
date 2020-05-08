namespace $ {

	export function $mol_view_tree_ts_transform(tree: $mol_tree) {
		const flat_module = tree.hack({
			'-': remove_comment,
			'': $mol_view_tree_ts_transform_flatten_props
		})

		// const locales: Record<string, string> = {}

		return tree.make({ type: 'block', sub: [
			tree.make({ data: 'namespace $ {'}),
			...flat_module.sub.map( cn => cn.make({
				type: 'block',
				sub: [
					cn.make({ type: 'line', sub: [
						cn.make({ data: 'export class' }),
						cn.make({ data: cn.type  }),
						cn.make({ data: 'extends' }),
						cn.sub[0].make({ data: cn.sub[0].type }),
						cn.make({ data: '{' }),	
					]}),

					cn.make({ type: 'block', sub: [
						cn.make({ data: 'test123' }),
						cn.make({ data: 'test1234' }),
						// ...cn.sub[0].sub.slice(1),
					] }),
					cn.make({ data: '}' }),
				]
			}) ),
			tree.make({ data: '}'}),
		] })
	}

	function remove_comment(): readonly $mol_tree[] {
		return [ ]
	}
}
