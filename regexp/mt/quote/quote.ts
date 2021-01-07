namespace $ {

	export let $mol_regexp_mt_quote_line = $mol_regexp.from([
		{ marker: '"' },
		' ',
		{ content: $mol_regexp_mt_line_content },
		$mol_regexp.line_end,
	])

	export let $mol_regexp_mt_quote = $mol_regexp.repeat_greedy( $mol_regexp_mt_quote_line, 1 )

}
