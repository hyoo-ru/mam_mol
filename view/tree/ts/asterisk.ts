namespace $ {
	export function $mol_view_tree_ts_asterisk(arg: $mol_tree, context: $mol_view_tree_ts_context) {
		return arg.make_struct('block', [
			arg.make_data('{'),
			arg.make_struct('block', arg.sub.map(opt => {
				if (opt.type === '-') return $mol_view_tree_ts_comment(opt)

				const info = $mol_view_tree_ts_prop_split(opt)
		
				if (opt.type === '^') return opt.make_struct('inline', [
					opt.make_data('...super.'),
					$mol_view_tree_ts_function_call(info),
					opt.make_data(' ,'),
				])

				const value = $mol_view_tree_ts_value(info, context)

				return opt.make_struct('inline', [
					$mol_view_tree_ts_quote(info.name),
					info.name.make_data(': '),
					info.next || info.key ? $mol_view_tree_ts_function_declaration(info) : undefined,
					info.next || info.key ? opt.make_data(' => ') : undefined,
					value,
					opt.make_data(', ')
				].filter($mol_guard_defined))
			})),
			arg.make_data('}'),
		])
	}
}

