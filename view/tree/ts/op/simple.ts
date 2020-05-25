namespace $ {
	export function $mol_view_tree_ts_op_simple(operator: $mol_tree, context: $mol_view_tree_ts_context): $mol_tree {
		const type = operator.type

		if (type === '') return operator.make_data(JSON.stringify(operator.value))

		if (type === 'false' || type === 'true') return operator.make_data( operator.type )

		if (type === 'null') return operator.make_struct('inline', [
			operator.make_data( operator.type ),
			operator.make_data( ' as any' ),
		])

		if (type === '*') return $mol_view_tree_ts_op_asterisk(operator, context)

		if (type[0] === '/') return $mol_view_tree_ts_op_array(operator, context)

		throw operator.error('Allowed values: `false`, `true`, ``, `null`, `*`, `/`')
	}
}
