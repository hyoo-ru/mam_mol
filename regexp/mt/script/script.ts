namespace $ {

	const { or } = $mol_regexp

	export let $mol_regexp_mt_script_line = $mol_regexp.from([
		'  ',
		{ marker: [ '  ', or, '++', or, '--', or, '**' ] },
		{ content: $mol_regexp_mt_line_content },
		$mol_regexp.line_end,
	])

	export let $mol_regexp_mt_script = $mol_regexp.repeat_greedy( $mol_regexp_mt_script_line, 1 )

}
