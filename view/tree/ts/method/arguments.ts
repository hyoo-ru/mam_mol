namespace $ {
	export function $mol_view_tree_ts_method_arguments(
		{ orig, name, key, value }: $mol_view_tree_ts_method_signature_type,
		needCache: boolean
	) {
		return [
			name.make({ data: '/**' }),
			name.make({ data: orig.toString() }),
			name.make({ data: '**/' }),
			needCache && key ? name.make({ data: `@ $${''}mol_mem_key`}) : undefined, 
			needCache && ! key ? name.make({ data: `@ $${''}mol_mem`}) : undefined,
			orig.make({ type: 'line', sub: [
				name,
				name.make({ data: '(' }),
				key?.make({ data: 'inline', sub: [
					key,
					key.make({ data: ' : any'})
				]}),
				key && value ? name.make({ data: ',' }) : undefined,
				value?.make({ data: 'inline', sub: [
					value,
					// Сборщик не различает зависимости в коде и в тексте, без разделения $ включит mol_mem_force как зависимость 
					value.make({ data: `? : any , force? : $${''}mol_mem_force`}),
				]}),
				name.make({ data: ')' }),
			].filter($mol_guard_defined) }),
		]
	}
}
