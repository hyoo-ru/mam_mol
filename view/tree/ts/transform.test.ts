namespace $.$$ {
	$mol_test( {
		'transform property'( $ ) {
			const tree = $mol_tree.fromString(`$mol_view_tree_test_binding $mol_view
	value?val <=> task_title_new?val \123
	enabled <= head_complete_enabled false		
`)

			const ts_tree = $mol_view_tree_ts_transform(tree)

			console.log(ts_tree.toString())
		},
	} )
}
