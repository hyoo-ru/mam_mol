namespace $ {
	export function $mol_view_tree2_function_declaration(
		{ name, key, next }: $mol_view_tree2_prop
	) {
		const sub = [ name.data('(') ]

		if (key) sub.push(key, key.data( ': any'))
		if (key && next) sub.push(name.data(', '))
		if (next) sub.push(next, next.data( '?: any'))
		sub.push(name.data(')'))

		return name.struct('inline', sub)
	}

	export function $mol_view_tree2_function_call(
		{ name, key, next }: $mol_view_tree2_prop
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
