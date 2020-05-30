namespace $ {
	export function $mol_view_tree_ts_function_declaration(
		{ name, key, next }: $mol_view_tree_ts_prop
	) {
		return name.struct('inline', [
			name.data('('),
			key,
			key?.data( ': any'),
			key && next ? name.data(', ') : undefined,
			next,
			// Сборщик не различает зависимости в коде и в тексте, без разделения $ включит mol_mem_force как зависимость 
			next?.data(`?: any`), //  , force? : $${''}mol_mem_force
			name.data(') '),
		].filter($mol_guard_defined))
	}

	export function $mol_view_tree_ts_function_call(
		{ name, key, next }: $mol_view_tree_ts_prop
	) {
		const sub: $mol_tree2[] = [
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
