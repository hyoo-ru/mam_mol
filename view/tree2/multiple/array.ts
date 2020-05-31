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

		const array_context = context.clone()

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

			let value: $mol_tree2 | undefined

			if (type === '<=') {
				const having = child.kids.length === 1 ? child.kids[0] : undefined
				if (! having) return this.$mol_fail(child.error(
					`Need a child, use ${example}`
				))
				const having_parts = this.$mol_view_tree2_prop_split(having)
				value = this.$mol_view_tree2_bind_left(having_parts, context)
			}
			else if (type === '*') {
				const having_parts = this.$mol_view_tree2_prop_split(prop.clone([ child ]))
				value = this.$mol_view_tree2_multiple_dictionary(having_parts, array_context)
			}
			else if (type[0] === '/') {
				const having_parts = this.$mol_view_tree2_prop_split(prop.clone([ child ]))	
				value = this.$mol_view_tree2_multiple_array(having_parts, array_context)
			}
			else value = this.$mol_view_tree2_literal(child)

			if (value) {
				sub.push(value.struct('inline', [
					value,
					value.data(',')
				]))
				continue
			}

			return this.$mol_fail(
				child.error(`Need an operator or constant, use ${example}`)
			)
		}

		const type_str = operator.type.substring(1)

		const type_body = [
			operator.data('] as '),
		]

		if (type_str === '') {
			type_body.push(operator.data('readonly any[]'))
		} else if (type_str === 'const') {
			type_body.push(operator.data('const'))
		} else {
			const type = $mol_tree2.data(type_str, [], operator.span.slice(1, type_str.length))
			type_body.push(
				operator.data('readonly '),
				type,
				operator.data('[]')
			)
		}

		return $mol_tree2.struct('lines', [
			prop.data('['),
			prop.struct('block', sub),
			prop.struct('inline', type_body)
		])
	}

	const example = '`<= test $' + + 's_class` `<= test \\some` or `@ \\test` or `123` or `false` or `true` or `null`'
}
