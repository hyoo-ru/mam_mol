namespace $.$$ {
	$mol_test( {
		'transform property'( $ ) {
			const tree = $mol_tree.fromString(`$mol_view_tree_test_attributes_subcomponent $mol_view
	- Comment
	Sub null
	some => some_prop
	Page!index $mol_view_tree_test_attributes_subcomponent_page
		Sub <= page!index null

$mol_view_tree_test_attributes_subcomponent_page $mol_view
`)

			const ts_tree = $mol_view_tree_ts_transform(tree)

			console.log(serialize(ts_tree))
			// console.log('--------------------------------------------------')

			// for( let def of $mol_view_tree_classes( tree ).sub ) {
			// 	console.log($mol_view_tree_class_props( def ).sub.map(s => s.toString()).join(''))
			// }
		},
	} )

	function serialize( node: $mol_tree, prefix = '' ) : string {
		if (node.type === 'line') return prefix + node.sub.map(child => serialize(child)).join(' ') + '\n'

		if (node.type === 'block') return node.sub.map(child => serialize(child, prefix + '\t')).join('\n') + '\n'

		return prefix + node.data + node.sub.map(child => serialize(child, prefix + '\t')).join('\n')
	}

}
