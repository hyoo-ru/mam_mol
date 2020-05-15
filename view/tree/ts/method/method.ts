namespace $ {
	export function $mol_view_tree_ts_method(prop: $mol_tree, locale: $mol_view_tree_ts_locale) {
		const info = $mol_view_tree_ts_method_signature(prop)
		const sub = prop.sub
		if ( sub.length > 1 ) throw prop.error( 'Too more sub' )

		let needCache = false

		return prop.make({ type: 'block', sub: [
			...$mol_view_tree_ts_method_arguments(info, needCache),
			prop.make({ data: '{' }),
			prop.make({ type: 'block', sub: prop.hack({

				'-': () => [],

				'': node => [ $mol_view_tree_ts_method_return(node.make({ data: JSON.stringify(node.value)})) ],

				'@': node => [ $mol_view_tree_ts_method_return(locale(node, info)) ],

				'true': node => [ $mol_view_tree_ts_method_return(node.make({ data: node.type })) ],

				'false': node => [ $mol_view_tree_ts_method_return(node.make({ data: node.type })) ],

				'null': node => [ $mol_view_tree_ts_method_return(node.make({ type: 'line', sub: [
					node.make({ data: node.type }),
					node.make({ data: 'as any'}),
				] })) ],
				'/': node => $mol_view_tree_ts_array(node, info),

			}).sub }),
			prop.make({ data: '}' }),
		].filter($mol_guard_defined)})
	}
}
