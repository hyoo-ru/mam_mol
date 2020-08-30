namespace $ {
	export function $mol_view_tree2_ts_function_declaration(
		{ name, key, next }: Pick<$mol_view_tree2_prop, 'name' | 'key' | 'next'>,
		types = false
	) {
		const sub = [ name.data('(') ]

		if (key) sub.push(key)
		if (types && key) sub.push(key.data( ': any'))
		if (key && next) sub.push(name.data(', '))
		if (next) sub.push(next)
		if (types && next) sub.push(next.data( '?: any'))
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
