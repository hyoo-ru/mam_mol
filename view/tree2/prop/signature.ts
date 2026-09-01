namespace $ {
	const { begin, end, latin_only, or, optional, repeat_greedy } = $mol_regexp

	export let $mol_view_tree2_prop_signature = $mol_regexp.from([
		begin,
		{ name: repeat_greedy( latin_only, 1 ) },
		{ key: optional([ '*', repeat_greedy( latin_only, 0 ) ]) },
		{ next: optional([ '?', repeat_greedy( latin_only, 0 ) ]) },
		end,
	])
	
}
