namespace $ {
	export function $mol_view_tree_ts_op_array(arg: $mol_tree, context: $mol_view_tree_ts_context) {
		return arg.make_struct('block', [
			arg.make_data('['),
			arg.make_struct('block', arg.sub.map(opt => {
				if (opt.type === '-') return $mol_view_tree_ts_comment(opt)

				const info = $mol_view_tree_ts_prop_split(opt)
		
				if (opt.type === '^') return opt.make_struct('inline', [
					opt.make_data('...super.'),
					$mol_view_tree_ts_function_call(info),
					opt.make_data(' ,'),
				])

				const value = $mol_view_tree_ts_op_simple(info, context)

				return opt.make_struct('inline', [
					value,
					opt.make_data(',')
				].filter($mol_guard_defined))
			})),
			arg.make_struct('inline', [
				arg.make_data('] as readonly '),
				arg.type.length > 1
					? arg.make({ data: arg.type.substring(1), col: arg.col + 1 })
					: arg.make_data('any'),
				arg.make_data('[]')
			])
		])
	}
}
