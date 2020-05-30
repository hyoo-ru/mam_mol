namespace $ {
	export function $mol_view_tree_ts_function_declaration(
		{ name, key, next }: $mol_view_tree_ts_prop
	) {
		return name.make_struct('inline', [
			name.make_data('('),
			key,
			key?.make_data( ': any'),
			key && next ? name.make_data(', ') : undefined,
			next,
			// Сборщик не различает зависимости в коде и в тексте, без разделения $ включит mol_mem_force как зависимость 
			next?.make_data(`?: any`), //  , force? : $${''}mol_mem_force
			name.make_data(') '),
		].filter($mol_guard_defined))
	}

	export function $mol_view_tree_ts_function_call(
		{ name, key, next }: $mol_view_tree_ts_prop
	) {
		const sub: $mol_tree[] = [
			name,
			name.make_data('('),
		]

		if (key) sub.push(key)
		if (next && key) sub.push(key.make_data(', '))
		if (next) sub.push(next)

		sub.push(name.make_data(')'))

		return name.make_struct('inline', sub)
	}
}
