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
		context: $mol_view_tree2_context,
		super_method?: $mol_view_tree2_prop | undefined
	) {
		if (operator.type[0] !== '/') return this.$mol_fail(
			err`Need a \`/\` at ${operator.span}`
		)

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
			const is_array = type.value.indexOf('[') !== -1

			type_body.push(operator.data('readonly '))
			if (is_array) type_body.push(operator.data('('))
			type_body.push(type)
			if (is_array) type_body.push(operator.data(')'))
			type_body.push(operator.data('[]'))
		}

		const body = this.$mol_view_tree2_ts_array_body(operator, context, super_method)

		return $mol_tree2.struct('lines', [
			operator.data('['),
			body,
			$mol_tree2.struct('inline', type_body)
		])
	}
}
