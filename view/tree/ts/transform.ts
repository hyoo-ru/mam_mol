namespace $ {

	/**
	 * Extract property parts: page!index?next
	 */
	function $mol_view_tree_ts_property(node: $mol_tree) {
		const propName = node.type

		let indexPos = propName.indexOf('!')
		let valuePos = propName.indexOf('?')
		if (valuePos === -1) valuePos = propName.length
		if (indexPos === -1) indexPos = valuePos
		if (indexPos > valuePos) indexPos = valuePos

		const name = propName.substring(0, indexPos)
		const key = indexPos === valuePos ? '' : propName.substring(indexPos + 1, valuePos)
		const value = propName.substring(valuePos + 1)

		return {
			name: node.make({ data: name }),
			key: key ? node.make({ data: key, col: node.col + indexPos }) : undefined,
			value: value ? node.make({ data: value, col: node.col + valuePos }) : undefined
		}
	}
	type $mol_view_tree_ts_property_type = ReturnType<typeof $mol_view_tree_ts_property>

	function $mol_view_tree_ts_locale_key(
		class_node: $mol_tree,
		prop: $mol_view_tree_ts_property_type
	) {
		const sub = [
			class_node.make({ data: class_node.type }),
			prop.name.make({ data: '_' }),
			prop.name.make({ data: prop.name.type }),
		]
		if (prop.key) sub.push(prop.key)
		if (prop.value) sub.push(prop.value)

		return prop.name.make({ type: 'inline', sub })
	}

	function $mol_view_tree_ts_locale( key: $mol_tree, value: $mol_tree ) {
		return value.make({ type: 'inline', sub: [
			value.make({ data: 'this.$.$mol_locale.text( \''}),
			key,
			value.make({ data: '\' )'}),
		] })
	}

	function $mol_view_tree_ts_array(value: $mol_tree) {
	}

	export function $mol_view_tree_ts_transform(tree: $mol_tree) {
		const flat_module = tree.hack({
			'-': remove_comment,
			'': $mol_view_tree_ts_transform_flatten_props
		})

		// const locales: Record<string, string> = {}

		return tree.make({ type: 'root', sub: [
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
						...cn.sub[0].sub,
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
