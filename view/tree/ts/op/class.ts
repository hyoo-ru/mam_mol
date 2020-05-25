namespace $ {
	export function $mol_view_tree_ts_op_class(class_node: $mol_tree, context: $mol_view_tree_ts_context) {
		const obj_node = class_node.make_data('obj')

		return [
			class_node.make_struct('inline', [
				class_node.make_data('const '),
				obj_node,
				class_node.make_data(' = new this.$.'),
				class_node.make_data(class_node.type),
				class_node.make_data('()')
			]),

			...class_node.sub.map(opt => {
				if (opt.type === '-') return $mol_view_tree_ts_comment(opt)

				const info = $mol_view_tree_ts_prop_split(opt)
				const value = $mol_view_tree_ts_op_simple(opt, context)
		
				return opt.make_struct('inline', [
					obj_node,
					opt.make_data('.'),
					info.name,
					$mol_view_tree_ts_function_declaration(info),
					opt.make_data(' => '),
					value,
				])
			}),

			class_node.make_struct('inline', [
				class_node.make_data('return '),
				obj_node	
			]),
		]
	}
}

