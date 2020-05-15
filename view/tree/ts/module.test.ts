namespace $.$$ {
	$mol_test( {
		'transform property'( $ ) {
			const tree = $mol_tree.fromString(`- comment 0
$mol_view_tree_test_attributes_subcomponent $mol_view
	- comment 1
	Sub null
	some /string
		- item1
		- item2
	Page!index $mol_view_tree_test_attributes_subcomponent_page
		- comment 2
		value?val <=> task_title_new?val \\123
		Sub <= page!index null
		width?v => outer_width?v

$mol_view_tree_test_attributes_subcomponent_page $mol_view
	width?val 0
`)

			console.log($mol_view_tree_compile(tree).script)
			console.log('--------------------------------------------------')
			console.log($mol_view_tree_ts_compile(tree))
		},
	} )
}
