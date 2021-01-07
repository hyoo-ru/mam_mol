namespace $ {

	export let $mol_regexp_mt_paragraph = $mol_regexp.from([
		{ content: $mol_regexp.repeat( $mol_regexp.byte ) },
		$mol_regexp.line_end,
	])
	
}
