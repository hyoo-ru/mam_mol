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

			console.log(ts_tree.map(item => serialize(item)).join('\n'))
			// console.log('--------------------------------------------------')

			// for( let def of $mol_view_tree_classes( tree ).sub ) {
			// 	console.log($mol_view_tree_class_props( def ).sub.map(s => s.toString()).join(''))
			// }
		},
	} )

	function serialize( node: $mol_tree, prefix = '' ) : string {
		var output = ''
		
		if( node.type.length ) {
			if( ! prefix ) prefix = "\t";
			output += node.type
			if( node.sub.length == 1 ) {
				return output + ' ' + serialize(node.sub[ 0 ], prefix)
			}
			output += "\n"
		} else if( node.data.length || prefix.length ) {
			output += node.data + "\n"
		}

		for( var child of node.sub ) {
			output += prefix
			output += serialize(child, prefix + "\t" )
		}
		
		return output
	}

}
