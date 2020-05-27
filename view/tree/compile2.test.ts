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
		mol_theme ${d}mol_theme_auto
	Simple null
	Source_first ${d}mol_page
	q <= Source_first1 ${d}mol_page
	Index_first!id ${d}sub
		report <= report!id null
		width?v => outer_width?v
	pages /
		<= \\test
		<= Source_second ${d}mol_page
			q2 <= Source_first2 ${d}mol_page
			a!id <= Index_second!id ${d}sub
				report <= report!id null
			arg *
				test <= compile \\
			title @ \\View.Tree
			tools /
				<= Compile ${d}mol_link
					sub /
						<= compile_label @ \\Compile
			body /
				<= Source_text ${d}mol_textarea
					value?val <=> source?val \\
					hint <= source_hint @ \\view.tree source

${d}sub ${d}mol_view
	width?val 0
`.trim())

			console.log($mol_view_tree_compile(tree).script)
			console.log('--------------------------------------------------')
			console.log($.$mol_view_tree_compile2(tree))
		},
	} )
}
