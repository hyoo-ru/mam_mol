namespace $ {

	export function $mol_view_tree_ts_value_simple(
		this: $mol_ambient_context,
		value: $mol_tree,
		owner_name: $mol_tree,
		context: $mol_view_tree_ts_context
	) {
		const type = value.type

		if (type === '@') return context.locale_call(owner_name, value)

		if (value.sub.length !== 0) return this.$mol_fail(
			value.error(`Simple value can\'t have child, use ${example}`)
		)

		if (type === '') return value.make_data(JSON.stringify(value.value))

		if (type === 'false' || type === 'true') return value.make_data( type )

		if (type === 'null') return value.make_struct('inline', [
			value.make_data(value.type),
			value.make_data(' as any'),
		])

		if (Number(type).toString() === type) return value.make_data(type)

		return this.$mol_fail(
			value.error(`Strange value, use ${example}`)
		)
	}

	const example = '`false` or `true` or 123 or `\\some` or `null` or `@ \\some`'

	export function $mol_view_tree_ts_value_simple_detect(value: $mol_tree) {
		const type = value.type

		if (Number(type).toString() === type) return true

		return type === '' || type === 'false' || type === 'true' || type === 'null' || type === '@'
	}
}
