namespace $.$$ {
	const src = `
		$${''}my_test $${''}my_super
			title @ \\title
			sub /
				<= Title $${''}mol_view
					sub /
						<= title
				<= Close $${''}mol_button
					title \close
					click?event <=> close?event null
			plugins /
				<= Speech $${''}mol_speech
					text => speech
	`
	
	const dest = `
		title @ \\title
		sub /
			<= Title
			<= Close
		plugins / <= Speech
		Title $${''}mol_view sub / <= title
		close?event null
		Close $${''}mol_button
			title \close
			click?event <=> close?event
		Speech $${''}mol_speech text => speech
	`.replace(/^\t\t/mg,'').trim() + '\n'

	$mol_test({
		'props'($) {
			const span = $mol_span.entire( '/mol/view/tree2/class/props.test.ts', src.length )
			const mod = $mol_tree2.fromString( src, span )
			const result = $.$mol_view_tree2_class_props(mod.kids[0]).toString()

			$mol_assert_equal(result, dest)
		} 
	})
}
