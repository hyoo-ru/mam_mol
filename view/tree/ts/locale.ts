namespace $ {
	export function $mol_view_tree_ts_locale_create({ class_node, locales }: {
		class_node: $mol_tree
		locales: Record<string, string>
	}) {
		return ( prop: $mol_tree, { name, key, value }: $mol_view_tree_ts_method_signature_type ) => {
			const sub = [
				class_node.make({ data: class_node.type }),
				name.make({ data: '_' }),
				name,
				key,
				value
			].filter($mol_guard_defined)

			const locale_key = sub.map(node => node.data).join('')

			locales[locale_key] = prop.value
	
			return prop.make({ type: 'inline', sub: [
				prop.make({ data: 'this.$.$mol_locale.text( \''}),
				...sub,
				prop.make({ data: '\' )'}),
			] })
		}
	}

	export type $mol_view_tree_ts_locale = ReturnType<typeof $mol_view_tree_ts_locale_create>
}
