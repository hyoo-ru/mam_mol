namespace $.$$ {
	const d = '$'
	const src = `
		${d}my_test ${d}my_super
			title @ \\title
			sub /
				<= Title ${d}mol_view
					sub /
						<= title
				<= Close ${d}mol_button
					title \close
					click?event <=> close?event null
			Some ${d}mol_speech
				Text => f
					g => h
			plugins /
				<= Speech ${d}mol_speech
					Text => a
						b => c
							d => e
	`
	/*
	class A {
		a() {
			return this.Speech().text()
		}
		c() {
			return this.a().b()
		}
	}
	*/

	const dest = $$.$mol_tree2_from_string(`
		title @ \\title
		sub /
			<= Title
			<= Close
		Some ${d}mol_speech
			Text => f
				g => h
		plugins / <= Speech
		Title ${d}mol_view sub / <= title
		close?event null
		Close ${d}mol_button
			title \close
			click?event <=> close?event
		f =
			Some ${d}mol_speech Text => f g => h
			Text
		h =
			f
			g
		a =
			Speech ${d}mol_speech Text => a b => c d => e
			Text
		c =
			a
			b
		e =
			c
			d
		Speech ${d}mol_speech
			Text => a
				b => c
					d => e
	`, 'reference')

	$mol_test({
		'props'($) {
			const mod = $.$mol_tree2_from_string( src, '/mol/view/tree2/class/props.test.ts' )
			const result = $.$mol_view_tree2_class_props(mod.kids[0]).join('')

			$mol_assert_equal(result, dest.toString())
		} 
	})
}
