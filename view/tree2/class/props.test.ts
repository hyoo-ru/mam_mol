namespace $.$$ {
	const d = '$'
	const file_name = '/mol/view/tree2/class/props.test.ts'

	function normalize($: $, src: string, dest?: string) {
		const mod = $.$mol_tree2_from_string( src, file_name )
		const input = $.$mol_view_tree2_class_props(mod.kids[0]).join('')
		const output = dest ? $$.$mol_tree2_from_string(dest, 'reference').toString() : ''
		return { input, output }
	}

	$mol_test({
		'dupes merge'($) {
			const src = `
				${d}my_test ${d}my_super
					query? \\
					Query $mol_string
						value? <=> query? \\
					Suggest_label ${d}mol_dimmer
						needle <= query? \\
						key * escape? <=> clear? null
					Clear ${d}mol_button_minor
						click?event <=> clear?event null
			`

			const dest = `
				query? \\
				clear?event null
				Query $mol_string value? <=> query?
				Suggest_label $mol_dimmer
					needle <= query?
					key * escape? <=> clear?
				Clear $mol_button_minor click?event <=> clear?event
			`
			const res = normalize($, src, dest)
			$mol_assert_equal(res.input, res.output)
		},

		'left and bidi common'($) {
			const src = `
				${d}my_test ${d}my_super
					title @ \\title
					sub2 /
						<= Close_icon ${d}mol_icon_cross
					sub /
						<= Title ${d}mol_view
							sub /
								<= title
						<= Close ${d}mol_button
							title \\close
							click?event <=> close?event null
			`
			
			const dest = `
				Close_icon ${d}mol_icon_cross
				Title ${d}mol_view sub / <= title
				close?event null
				Close ${d}mol_button
					title \\close
					click?event <=> close?event
				title @ \\title
				sub2 / <= Close_icon
				sub /
					<= Title
					<= Close
			`
		
			const res = normalize($, src, dest)
			$mol_assert_equal(res.input, res.output)
		},

		'right bind levels'($) {
			const src = `
				${d}my_test ${d}my_super
					Dog ${d}mol_view_tree2_class_test_dog
						Mouth => Dog_mouth
							animation => dog_animation
					plugins /
						<= Human* ${d}mol_view_tree2_class_test_human
							Mouth => Human_mouth
								animation => human_animation
									text => human_text
			`

			const dest = `
				Dog_mouth = Dog Mouth
				dog_animation = Dog_mouth animation
				Human_mouth = Human* Mouth
				human_animation = Human_mouth animation
				human_text = human_animation text
				Human* $mol_view_tree2_class_test_human Mouth => Human_mouth animation => human_animation text => human_text
				Dog $mol_view_tree2_class_test_dog Mouth => Dog_mouth animation => dog_animation
				plugins / <= Human*
			`

			const res = normalize($, src, dest)
			$mol_assert_equal(res.input, res.output)
		},

		'good right bind dupes'($) {
			const src = `
				${d}my_test ${d}my_super
					Suggest_label ${d}mol_dimmer
						clear? => clear?
					Clear ${d}mol_button_minor
						click?e <=> clear?e
			`

			const dest = `
				clear? = Suggest_label clear?
				Suggest_label $mol_dimmer clear? => clear?
				Clear $mol_button_minor click?e <=> clear?e
			`

			const res = normalize($, src, dest)
			$mol_assert_equal(res.input, res.output)
		},

		'conflicting right bind dupes'($) {
			const src = `
				${d}my_test ${d}my_super
					Suggest_label ${d}mol_dimmer
						clear => clear
					Clear ${d}mol_button_minor
						click?event <=> clear?event null
			`

			$mol_assert_fail(
				() => normalize($, src).input,
				`Need an equal default values at \`/mol/view/tree2/class/props.test.ts#4:16/5\` vs \`/mol/view/tree2/class/props.test.ts#6:23/11\`
<=>
/mol/view/tree2/class/props.test.ts#6:19/3
click?event
/mol/view/tree2/class/props.test.ts#6:7/11
$mol_button_minor
/mol/view/tree2/class/props.test.ts#5:12/17
Clear
/mol/view/tree2/class/props.test.ts#5:6/5`
			)
		},
	})
}
