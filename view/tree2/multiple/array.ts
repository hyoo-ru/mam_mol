namespace $ {
	/*
	 * ```tree
	 * prop /
	 * 	\test
	 * 	<= Some $zzz_class
	 * ```
	 */
	export function $mol_view_tree2_multiple_array(
		this: $mol_ambient_context,
		prop_parts: $mol_view_tree2_prop,
		context: $mol_view_tree2_context
	) {
		const prop = prop_parts.src
		const operator = prop.kids.length === 1 ? prop.kids[0] : undefined

		if (! operator?.type || operator.type[0] !== '/') return this.$mol_fail(
			prop.error('Need a `/` operator')
		)

		const super_spread = new $mol_view_tree2_multiple_spread(this, prop_parts)

		const sub: $mol_tree2[] = []

		for (const child of operator.kids) {
			const type = child.type

			if (type === '-') {
				sub.push($mol_view_tree2_comment(child))
				continue
			}

			if (type === '^') {
				sub.push(super_spread.get(child))
				continue
			}

			if (type === '*') {
				const having_parts = this.$mol_view_tree2_prop_split(prop.clone([ child ]))	
				sub.push(add_comma(this.$mol_view_tree2_multiple_dictionary(having_parts, context)))
				continue
			}

			if (type === '<=') {
				const having = child.kids.length === 1 ? child.kids[0] : undefined

				if (! having) return this.$mol_fail(
					child.error(`Need a child, use ${example}`)
				)

				const having_parts = this.$mol_view_tree2_prop_split(having)

				sub.push(add_comma(this.$mol_view_tree2_bind_left(having_parts, context)))
				continue
			}

			if ($mol_view_tree2_simple_detect(child)) {
				sub.push(add_comma(this.$mol_view_tree2_simple(child, prop_parts.name, context)))
				continue
			}

			return this.$mol_fail(
				child.error(`Need an operator or constant, use ${example}`)
			)
		}

		const type_str = operator.type.substring(1)

		const type = type_str
			? $mol_tree2.data(type_str, [], operator.span.slice(1, type_str.length))
			: operator.data('any')

		return $mol_tree2.struct('lines', [
			prop.data('['),
			prop.struct('block', sub),
			prop.struct('inline', [
				operator.data('] as readonly '),
				type,
				operator.data('[]')
			])
		])
	}

	function add_comma(value: $mol_tree2) {
		return value.struct('inline', [
			value,
			value.data(',')
		])
	}

	const example = '`<= test $' + + 's_class` `<= test \\some` or `@ \\test` or `123` or `false` or `true` or `null`'
}
