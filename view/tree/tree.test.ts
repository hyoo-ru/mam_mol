namespace $ {
	const ts = (tree: string) => $mol_view_tree_compile($mol_tree.fromString(tree)).script.trim()

	$mol_test( {
		'empty_class'() {
			$mol_assert_equal(ts(
`$mol_string $mol_view`
),
`namespace $ { export class $mol_string extends $mol_view {

} }`)
		},

		'simple properties'() {
			$mol_assert_equal(ts(`
$mol_string $mol_view
	dom_name \\input
	enabled true
	debounce 0
	autocomplete false
`), `namespace $ { export class $mol_string extends $mol_view {

	/**
	 *  \`\`\`
	 *  dom_name \\input
	 *  \`\`\`
	 **/
	dom_name() {
		return "input"
	}

	/**
	 *  \`\`\`
	 *  enabled true
	 *  \`\`\`
	 **/
	enabled() {
		return true
	}

	/**
	 *  \`\`\`
	 *  debounce 0
	 *  \`\`\`
	 **/
	debounce() {
		return 0
	}

	/**
	 *  \`\`\`
	 *  autocomplete false
	 *  \`\`\`
	 **/
	autocomplete() {
		return false
	}

} }`)			
		}

	} )
}
