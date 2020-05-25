namespace $ {
	export function $mol_view_tree_ts_class_node(class_node: $mol_tree, context: $mol_view_tree_ts_context) {
		if( !/^\$\w+$/.test( class_node.type ) ) throw class_node.error( 'Wrong class name' )
		const sub = class_node.sub
		if (sub.length !== 1) throw class_node.error('extend $mol_view')
		const mol_view_class = sub[0]

		for (const item of mol_view_class.sub) $mol_view_tree_ts_op_simple(item, context)

		return class_node.make({ type: 'block', sub: [
			class_node.make({ type: 'line', sub: [
				class_node.make({ data: 'export class' }),
				class_node.make({ data: class_node.type }),
				class_node.make({ data: 'extends' }),
				mol_view_class.make({ data: mol_view_class.type }),
				class_node.make({ data: '{' }),
			]}),

			class_node.make_struct('block', context.methods),

			class_node.make_data('}'),
		] })
	}
}
