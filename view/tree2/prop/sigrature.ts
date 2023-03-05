namespace $ {
	
	const { begin, end, char_only, latin_only: letter, optional, repeat_greedy } = $mol_regexp

	const name = char_only( letter, '$-' )

	export let $mol_view_tree2_prop_signature = $mol_regexp.from([
		begin,
		{ name: repeat_greedy( name, 1 ) },
		{ key: optional([ '*', repeat_greedy( letter, 0 ) ]) },
		{ next: optional([ '?', repeat_greedy( letter, 0 ) ]) },
		end,
	])
	
}
