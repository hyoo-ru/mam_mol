namespace $ {

	export let $mol_regexp_mt_list_item = $mol_regexp.from([
		{ indent: $mol_regexp.repeat('  ') },
		{ marker: [ '-', $mol_regexp.or, '+' ] },
		' ',
		{ content: $mol_regexp_mt_line_content },
		$mol_regexp.line_end,
	])

	export let $mol_regexp_mt_list = $mol_regexp.repeat_greedy( $mol_regexp_mt_list_item, 1 )

}
