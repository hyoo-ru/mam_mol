namespace $ {

	const err = $mol_view_tree2_error_str

	export function $mol_view_tree2_literal(
		this: $mol_ambient_context,
		value: $mol_tree2,
	) {
		const type = value.type

		if (value.kids.length !== 0) return this.$mol_fail(
			err`Childs not allowed at ${value.span}, use ${example}`
		)

		if (type === '') return value.data(JSON.stringify(value.value))

		if (type === 'false' || type === 'true') return value.data(type)

		if (type === 'null') return $mol_tree2.struct('inline', [
			value.data(value.type),
			value.data(' as any'),
		])

		if (Number(type).toString() === type) return value.data(type)

		return this.$mol_fail(
			err`Value ${value.value} not allowed at ${value.span}, use ${example}`
		)
	}

	const example = '`false` or `true` or 123 or `\\some` or `null`'
}
