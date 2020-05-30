namespace $ {
	/*
	 * ```tree
	 * prop /
	 * 	\test
	 * 	<= Some $zzz_class
	 * ```
	 */
	export function $mol_view_tree_ts_array(
		this: $mol_ambient_context,
		prop_parts: $mol_view_tree_ts_prop,
		context: $mol_view_tree_ts_context
	) {
		const prop = prop_parts.src
		const operator = prop.sub.length === 1 ? prop.sub[0] : undefined

		if (! operator?.type || operator.type[0] !== '/') return this.$mol_fail(
			prop.error('Need a `/` operator')
		)

		const super_spread = new $mol_view_tree_ts_spread(this, prop_parts)

		const sub: $mol_tree[] = []

		for (const child of operator.sub) {
			const type = child.type

			if (type === '-') {
				sub.push($mol_view_tree_ts_comment(child))
				continue
			}

			if (type === '^') {
				sub.push(super_spread.get(child))
				continue
			}

			if (type === '*') {
				const having_parts = this.$mol_view_tree_ts_prop_split(prop.clone({ sub: [ child ] } ))	
				sub.push(add_comma(this.$mol_view_tree_ts_dictionary(having_parts, context)))
				continue
			}

			if (type === '<=') {
				const having = child.sub.length === 1 ? child.sub[0] : undefined

				if (! having) return this.$mol_fail(
					child.error(`Need a child, use ${example}`)
				)

				const having_parts = this.$mol_view_tree_ts_prop_split(having)

				sub.push(add_comma(this.$mol_view_tree_ts_bind_left(having_parts, context)))
				continue
			}

			if ($mol_view_tree_ts_value_simple_detect(child)) {
				sub.push(add_comma(this.$mol_view_tree_ts_value_simple(child, prop_parts.name, context)))
				continue
			}

			return this.$mol_fail(
				child.error(`Need an operator or constant, use ${example}`)
			)
		}

		const type = operator.type.length > 1
			? operator.make({ data: operator.type.substring(1), col: operator.col + 1 })
			: operator.make_data('any')

		return prop.make_struct('lines', [
			prop.make_data('['),
			prop.make_struct('block', sub),
			prop.make_struct('inline', [
				operator.make_data('] as readonly '),
				type,
				operator.make_data('[]')
			])
		])
	}

	function add_comma(value: $mol_tree) {
		return value.make_struct('inline', [
			value,
			value.make_data(',')
		])
	}

	const example = '`<= test $' + + 's_class` `<= test \\some` or `@ \\test` or `123` or `false` or `true` or `null`'
}
