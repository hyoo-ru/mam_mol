namespace $ {
	export function $mol_view_tree_ts_locale( key: $mol_tree, value: $mol_tree ) {
		return value.make({ type: 'inline', sub: [
			value.make({ data: 'this.$.$mol_locale.text( \''}),
			key,
			value.make({ data: '\' )'}),
		] })
	}

	export function $mol_view_tree_ts_locale_key(
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
}
