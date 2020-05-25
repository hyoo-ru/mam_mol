namespace $ {
	/**
	 * ```tree
	 * prop /
	 * 	\test
	 * 	<= Some $my_class
	 * ```
	 */
	export function $mol_view_tree_ts_array(prop_parts: $mol_view_tree_ts_prop, context: $mol_view_tree_ts_context) {
		const prop = prop_parts.src
		const operator = prop.sub.length === 1 ? prop.sub[0] : undefined
		if (! operator?.type || operator.type[0] !== '/') throw prop.error('Need a `/` operator')

		const super_spread = new $mol_view_tree_ts_spread(prop_parts)

		return prop.make_struct('block', [
			prop.make_data('['),
			prop.make_struct('block', prop.sub.map(child => {
				if (child.type === '-') return $mol_view_tree_ts_comment(child)
				if (child.type === '^') return super_spread.get(child)

				const operator = child.sub.length === 1 ? child.sub[0] : undefined

				let value: $mol_tree | undefined

				if (operator?.type === '<=') {
					const having = operator.sub.length === 1 ? operator.sub[0] : undefined
					if (! having) throw operator.error(`Need a child, use ${example}`)

					const having_parts = $mol_view_tree_ts_prop_split(having)
	
					value = $mol_view_tree_ts_value(having_parts, context)
				}

				if (operator && $mol_view_tree_ts_value_simple_detect(operator)) value = $mol_view_tree_ts_value_simple(operator, prop_parts.name, context)

				if (! value) throw child.error(`Need an operator or constant, use ${example}`)

				return child.make_struct('inline', [
					value,
					child.make_data(',')
				])
			})),
			prop.make_struct('inline', [
				prop.make_data('] as readonly '),
				prop.type.length > 1
					? prop.make({ data: prop.type.substring(1), col: prop.col + 1 })
					: prop.make_data('any'),
				prop.make_data('[]')
			])
		])
	}

	const example = '`<= test $class` `<= test \\some` or `@ \\test` or `123` or `false` or `true` or `null`'
}
