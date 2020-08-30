namespace $ {

	const err = $mol_view_tree2_error_str

	export function $mol_view_tree2_value(
		this: $mol_ambient_context,
		value: $mol_tree2,
	) {
		const type = value.type
		const kids = value.kids

		if (type === '') {
			if (kids.length === 0) return value.data(JSON.stringify(value.value))

			return value.data(JSON.stringify(kids.map(node => node.value).join('\n')))
		}

		if (kids.length !== 0) return this.$mol_fail(
			err`Childs not allowed at ${value.span}, use ${example}`
		)

		if (type === 'false' || type === 'true') return value.data(type)

		if (type === 'null') return value.data(type)

		if (Number(type).toString() === type) return value.data(type)

		return this.$mol_fail(
			err`Value ${value.value} not allowed at ${value.span}, use ${example}`
		)
	}

	const example = new $mol_view_tree2_error_suggestions([
		'fales',
		'true',
		'123',
		'null',
		'\\some'
	])
}
