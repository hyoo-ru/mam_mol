namespace $ {
	export function $mol_view_tree_ts_class_node(class_node: $mol_tree, locale: $mol_view_tree_ts_locale) {
		if( !/^\$\w+$/.test( class_node.type ) ) throw class_node.error( 'Wrong class name' )
		const body = class_node.sub[0]

		return class_node.make({ type: 'block', sub: [
			class_node.make({ type: 'line', sub: [
				class_node.make({ data: 'export class' }),
				class_node.make({ data: class_node.type }),
				class_node.make({ data: 'extends' }),
				body.make({ data: body.type }),
				class_node.make({ data: '{' }),	
			]}),

			class_node.make({
				type: 'block',
				sub: $mol_view_tree_props(class_node).map(
					prop => $mol_view_tree_ts_method(prop, locale)
				)
			}),

			class_node.make({ data: '}' }),
		] })
	}
}
