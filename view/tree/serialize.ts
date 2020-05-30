namespace $ {
	export function $mol_view_tree_serialize(
		this: $mol_ambient_context,
		node: $mol_tree,
		prefix = '',
		parent_is_inline = false
	) : string {
		const { type, sub, data } = node

		if (! data && ! type) return sub.map(
			child => this.$mol_view_tree_serialize(child, prefix)
		).join('\n')

		if (type === 'block') {
			const child_prefix = prefix + '\t'
			return sub.map(
				(child, index) => this.$mol_view_tree_serialize(
					child,
					child_prefix,
					index === 0 && parent_is_inline
				)
			).join('\n')
		}

		if (type === 'lines') return sub.map(
			(child, index) => this.$mol_view_tree_serialize(
				child,
				prefix,
				index === 0 && parent_is_inline
			)
		).join('\n')

		const current_prefix = parent_is_inline ? '' : prefix

		if (type === 'inline') return current_prefix + sub.map(child => this.$mol_view_tree_serialize(child, prefix, true)).join('')

		return current_prefix + data
	}
}
