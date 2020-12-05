namespace $ {
	const err = $mol_view_tree2_error_str

	/*
	 * ```tree
	 * prop /
	 * 	\test
	 * 	<= Some $zzz_class
	 * ```
	 */
	export function $mol_view_tree2_ts_array(
		this: $mol_ambient_context,
		operator: $mol_tree2,
		context: $mol_view_tree2_ts_context,
		super_method?: $mol_view_tree2_prop | undefined
	): $mol_view_tree2_ts_method_body_type {
		if (operator.type[0] !== '/') return this.$mol_fail(
			err`Need a \`/\` at ${operator.span}`
		)

		const body = this.$mol_view_tree2_ts_array_body(operator, context, super_method)

		const code = $mol_tree2.struct('lines', [
			operator.data('['),
			body.code,
			operator.data(']'),
		])

		const type_body: $mol_tree2[] = []

		const type_str = operator.type.substring(1)

		if (type_str === '') {
			type_body.push(operator.data('readonly any[]'))
		} else if (type_str === 'const') {
			type_body.push(operator.data('('), body.result_type, operator.data(')[]'))
		} else {
			const type = $mol_tree2.data(type_str, [], operator.span.slice(1, type_str.length))
			const is_array = type.value.indexOf('[') !== -1

			type_body.push(operator.data('readonly '))
			if (is_array) type_body.push(operator.data('('))
			type_body.push(type)
			if (is_array) type_body.push(operator.data(')'))
			type_body.push(operator.data('[]'))
		}

		const result_type = $mol_tree2.struct('inline', type_body)

		return { code, result_type }
	}
}
