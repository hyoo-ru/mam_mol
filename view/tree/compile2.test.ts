namespace $.$$ {
	const d = '$'

	$mol_test( {
		'transform property'( $ ) {
			const tree = $mol_tree.fromString(`
${d}hyoo_tree ${d}mol_book2
	- qweqwe
	arg *
		compile \\
	attr *
		^
		mol_theme \\${d}mol_theme_auto
`.trim())

			console.log($mol_view_tree_compile(tree).script)
			console.log('--------------------------------------------------')
			// console.log($.$mol_view_tree_compile2(tree))
		},
	} )
}
