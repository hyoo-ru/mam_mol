namespace $ {
	export function $mol_view_tree_ts_value(prop_parts: $mol_view_tree_ts_prop, context: $mol_view_tree_ts_context): $mol_tree {
		const operator = prop_parts.src.sub.length === 1 ? prop_parts.src.sub[0] : undefined
		if (! operator) throw prop_parts.src.error(`Need an operator, use ${example}`)

		const type = operator.type

		if (type === '*') return $mol_view_tree_ts_asterisk(prop_parts, context)

		if (type[0] === '/') return $mol_view_tree_ts_array(prop_parts, context)

		if (type === '<=') return $mol_view_tree_ts_bind_left(prop_parts, context)

		if (type === '<=>') return $mol_view_tree_ts_bind_both(prop_parts, context)

		if ($mol_view_tree_ts_value_simple_detect(operator)) return $mol_view_tree_ts_value_simple(operator, prop_parts.name, context)

		throw operator.error(`Strange operator type, use ${example}`)
	}

	const example = '`false` or `true` or `` or `null` or `@` or `*` or `/` or `<=` or `<=>`'
}
