namespace $.$$ {
	$mol_test( {
		'transform property'( $ ) {
			const tree = $mol_tree.fromString(`
$hyoo_tree $mol_book2
	- qweqwe
	arg *
		compile \\
	attr *
		^
		mol_theme \\$mol_theme_auto
	Simple null
	Source_first $mol_page
	q <= Source_first1 $mol_page
	Index_first!id $sub
		report <= report!id null
		width?v => outer_width?v
	pages /
		<= \\test
		<= Source_second $mol_page
			q2 <= Source_first2 $mol_page
			a!id <= Index_second!id $sub
				report <= report!id null
			arg *
				test <= compile \\
			title @ \\View.Tree
			tools /
				<= Compile $mol_link 
					sub /
						<= compile_label @ \\Compile
			body /
				<= Source_text $mol_textarea
					value?val <=> source?val \\
					hint <= source_hint @ \\view.tree source

$sub $mol_view
	width?val 0
`.trim())

			console.log($mol_view_tree_compile(tree).script)
			console.log('--------------------------------------------------')
			console.log($.$mol_view_tree_compile2(tree))
		},
	} )
}
