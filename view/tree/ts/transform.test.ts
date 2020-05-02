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

			console.log(ts_tree.sub.map(s => s.toString()).join(''))
			console.log('--------------------------------------------------')

			for( let def of $mol_view_tree_classes( tree ).sub ) {
				console.log($mol_view_tree_class_props( def ).sub.map(s => s.toString()).join(''))
			}
		},
	} )
}
