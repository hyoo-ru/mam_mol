namespace $ {

	const { optional, slash_back, byte, byte_except, repeat } = $mol_regexp

	export let $mol_regexp_mt_line_content = repeat( byte, 1 )

	const uri = repeat( byte_except( slash_back ) )

	function with_marker<
		Groups extends { content: string }
	>(
		marker: string,
		content = $mol_regexp.from({
			content: $mol_regexp_mt_line_content
		}) as $mol_regexp< Groups >,
	) {
		return $mol_regexp.from([ { marker }, content, marker ])
	}

	const strong = with_marker( '**' )
	const emphasis = with_marker( '//' )
	const insertion = with_marker( '++' )
	const deletion = with_marker( '--' )
	const code = with_marker( '  ' )

	function with_uri<
		Groups extends { content: string }
	>(
		content = $mol_regexp.from({
			content: $mol_regexp_mt_line_content
		}) as $mol_regexp< Groups >,
	) {
		return $mol_regexp.from([
			optional([ content, slash_back ]),
			{ uri },
		])
	}

	const link = with_marker( '\\\\', with_uri() )
	const embed = with_marker( '""', with_uri() )

	export let $mol_regexp_mt_line = $mol_regexp.from([
		{ strong, emphasis, insertion, deletion, code, link, embed }
	])
	
}
