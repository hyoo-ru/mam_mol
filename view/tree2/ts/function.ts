namespace $ {
	export function $mol_view_tree2_ts_function_type(
		{ name, key, key_type, next, next_type }: Pick<$mol_view_tree2_prop, 'name' | 'key' | 'next' | 'key_type' | 'next_type'>,
		result_type: $mol_tree2
	) {
		const sub = [ name, name.data('(') ]

		if (key && key_type) sub.push(key, key.data( ': '), key_type)
		if (key && next) sub.push(name.data(', '))
		if (next) sub.push(next, next.data( '?: '), next_type ?? result_type)
		sub.push(name.data('): '), result_type)

		return name.struct('inline', sub)
	}

	export function $mol_view_tree2_ts_function_declaration(
		{ name, key, next }: Pick<$mol_view_tree2_prop, 'name' | 'key' | 'next'>
	) {
		const sub = [ name.data('(') ]

		if (key) sub.push(key)
		if (key && next) sub.push(name.data(', '))
		if (next) sub.push(next)
		sub.push(name.data(')'))

		return name.struct('inline', sub)
	}

	export function $mol_view_tree2_ts_function_call(
		{ name, key, next }: Pick<$mol_view_tree2_prop, 'name' | 'key' | 'next'>
	) {
		const sub = [
			name,
			name.data('('),
		]

		if (key) sub.push(key)
		if (next && key) sub.push(key.data(', '))
		if (next) sub.push(next)

		sub.push(name.data(')'))

		return name.struct('inline', sub)
	}
}
