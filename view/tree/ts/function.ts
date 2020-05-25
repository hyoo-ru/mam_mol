namespace $ {
	export function $mol_view_tree_ts_function_declaration({ name, key, next }: $mol_view_tree_ts_prop) {
		return name.make({ type: 'inline', sub: [
			name.make({ data: '( ' }),
			key,
			key?.make({ data: ' : any'}),
			key && next ? name.make({ data: ' , ' }) : undefined,
			next,
			// Сборщик не различает зависимости в коде и в тексте, без разделения $ включит mol_mem_force как зависимость 
			next?.make({ data: ` ? : any`}), //  , force? : $${''}mol_mem_force
			name.make({ data: ' ) ' }),
		].filter($mol_guard_defined) })
	}

	export function $mol_view_tree_ts_function_call({ name, key, next }: $mol_view_tree_ts_prop) {
		const sub: $mol_tree[] = [ name, name.make({ data: '( ' }) ]

		if (key) sub.push(key)
		if (next && key) sub.push(key.make_data(', '))
		if (next) sub.push(next)

		sub.push(name.make({ data: ')' }))

		return name.make_struct('inline', sub)
	}
}
