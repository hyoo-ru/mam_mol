namespace $ {
	export function $mol_view_tree_ts_serialize( node: $mol_tree, prefix = '') : string {
		if (node.type === 'line') return prefix + node.sub.map(child => $mol_view_tree_ts_serialize(child)).join(' ')
		if (node.type === 'inline') return node.sub.map(child => $mol_view_tree_ts_serialize(child)).join('')

		const child_prefix = node.type === 'root' ? prefix : (prefix + '\t')
		const childs = node.sub.map(child => $mol_view_tree_ts_serialize(child, child_prefix)).join('\n')

		if (node.type === 'root') return childs + '\n'
		if (node.type === 'block') return '\n' + childs + '\n'

		return prefix + (node.data || node.type) + childs
	}
}
