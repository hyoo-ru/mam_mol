namespace $.$$ {
	const d = '$'
	const src = `
		${d}my_test ${d}my_super
			title @ \\title
			sub2 /
				<= Сlose_icon ${d}mol_icon_cross
			sub /
				<= Title ${d}mol_view
					sub /
						<= title
				<= Close ${d}mol_button
					title \\close
					click?event <=> close?event null
			Dog ${d}mol_view_tree2_class_test_dog
				Mouth => Dog_mouth
					animation => dog_animation
			plugins /
				<= Human* ${d}mol_view_tree2_class_test_human
					Mouth => Human_mouth
						animation => human_animation
							text => human_text
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
		sub2 / <= Сlose_icon
		sub /
			<= Title
			<= Close
		Dog $mol_view_tree2_class_test_dog Mouth => Dog_mouth animation => dog_animation
		plugins / <= Human*
		Сlose_icon ${d}mol_icon_cross
		Title ${d}mol_view sub / <= title
		close?event null
		Close ${d}mol_button
			title \\close
			click?event <=> close?event
		Dog_mouth = Dog Mouth
		dog_animation = Dog_mouth animation
		Human_mouth = Human* Mouth
		human_animation = Human_mouth animation
		human_text = human_animation text
		Human* $mol_view_tree2_class_test_human Mouth => Human_mouth animation => human_animation text => human_text
	`, 'reference')

	$mol_test({
		'props'($) {
			const mod = $.$mol_tree2_from_string( src, '/mol/view/tree2/class/props.test.ts' )
			const result = $.$mol_view_tree2_class_props(mod.kids[0]).join('')

			$mol_assert_equal(result, dest.toString())
		} 
	})
}
