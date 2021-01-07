namespace $ {

	export let $mol_regexp_mt_flow = $mol_regexp.from(
		[
			$mol_regexp.begin,
			{
				header: $mol_regexp_mt_header,
				list: $mol_regexp_mt_list,
				quote: $mol_regexp_mt_quote,
				table: $mol_regexp_mt_table,
				script: $mol_regexp_mt_script,
				paragraph: $mol_regexp_mt_paragraph,
			},
		],
		{ multiline: true },
	)

}
