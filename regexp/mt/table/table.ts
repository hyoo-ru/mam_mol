namespace $ {

	export let $mol_regexp_mt_table_line = $mol_regexp.from([
		{ indent: $mol_regexp.repeat('  ') },
		{ marker: '!' },
		' ',
		{ content: $mol_regexp_mt_line_content },
		$mol_regexp.line_end,
	])

	export let $mol_regexp_mt_table = $mol_regexp.repeat_greedy( $mol_regexp_mt_table_line, 1 )

}
