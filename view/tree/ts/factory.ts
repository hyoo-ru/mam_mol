namespace $ {
	export function $mol_view_tree_ts_factory(class_node: $mol_tree, parent_factory: $mol_tree, context: $mol_view_tree_ts_context) {
		const obj_node = class_node.make_data('obj')

		const sub: $mol_tree[] = [
			class_node.make_struct('inline', [
				class_node.make_data('const '),
				obj_node,
				class_node.make_data(' = new this.$.'),
				class_node.make_data(class_node.type),
				class_node.make_data('()')
			]),
		]

		for (const opt of class_node.sub) {
			if (opt.type === '-') {
				sub.push($mol_view_tree_ts_comment(opt))
				continue
			}

			const operator = opt.sub.length === 1 ? opt.sub[0] : undefined

			if (operator?.type === '=>') {
				$mol_view_tree_ts_bind_right(opt, parent_factory, context)
				continue
			}

			const info = $mol_view_tree_ts_prop_split(opt)
			const value = $mol_view_tree_ts_value(info, context)
	
			const call = opt.make_struct('inline', [
				obj_node,
				opt.make_data('.'),
				info.name,
				$mol_view_tree_ts_function_declaration(info),
				opt.make_data(' => '),
				value,
			])

			sub.push(call)
		}

		sub.push(
			class_node.make_struct('inline', [
				class_node.make_data('return '),
				obj_node	
			])
		)

		return class_node.make_struct('block', sub)
	}
}

