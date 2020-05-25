namespace $ {
	export function $mol_view_tree_ts_value({ name, src }: $mol_view_tree_ts_prop, context: $mol_view_tree_ts_context): $mol_tree {
		const operator = src.sub.length === 1 ? src.sub[0] : undefined
		if (! operator) throw src.error('Need an operator')

		const type = operator.type

		if (type === '') return operator.make_data(JSON.stringify(operator.value))

		if (type === 'false' || type === 'true') return operator.make_data( operator.type )

		if (type === 'null') return operator.make_struct('inline', [
			operator.make_data( operator.type ),
			operator.make_data( ' as any' ),
		])

		if (type === '@') return context.locale_call(name, operator)

		if (type === '*') return $mol_view_tree_ts_asterisk(operator, context)

		if (type[0] === '/') return $mol_view_tree_ts_array(operator, context)

		if (type === '<=') return $mol_view_tree_ts_bind_left(operator, context)

		if (type === '<=>') return $mol_view_tree_ts_bind_both(operator, context)


		throw operator.error('Strange operator type, use `false` or `true` or `` or `null` or `@` or `*` or `/` or `<=` or `<=>`')
	}

	export function $mol_view_tree_ts_value_block(prop_parts: $mol_view_tree_ts_prop, context: $mol_view_tree_ts_context) {
		const operator = prop_parts.src.sub.length === 1 ? prop_parts.src.sub[0] : undefined
		if (! operator) throw prop_parts.src.error('Need an operator')

		let body: $mol_tree

		if (operator.type[0] === '$') body = $mol_view_tree_ts_factory(prop_parts, context)
		else body = operator.make_struct('block', [
			operator.make_struct('inline', [
				operator.make_data('return '),
				$mol_view_tree_ts_value(prop_parts, context)
			])
		])

		return $mol_view_tree_ts_method(prop_parts, body)
	}
}
