namespace $ {

	export let $mol_regexp_mt_header = $mol_regexp.from([
		{ marker: $mol_regexp.repeat_greedy( '=', 1, 6 ) },
		' ',
		{ content: $mol_regexp_mt_line_content },
		$mol_regexp.line_end,
	])
	
}
