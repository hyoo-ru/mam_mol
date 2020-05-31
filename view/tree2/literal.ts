namespace $ {

	export function $mol_view_tree2_literal(
		this: $mol_ambient_context,
		value: $mol_tree2,
	) {
		const type = value.type

		if (value.kids.length !== 0) return this.$mol_fail(
			value.error(`Simple value can\'t have child, use ${example}`)
		)

		if (type === '') return value.data(JSON.stringify(value.value))

		if (type === 'false' || type === 'true') return value.data( type )

		if (type === 'null') return value.struct('inline', [
			value.data(value.type),
			value.data(' as any'),
		])

		if (Number(type).toString() === type) return value.data(type)
	}

	const example = '`false` or `true` or 123 or `\\some` or `null`'
}
