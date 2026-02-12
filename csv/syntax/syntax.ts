namespace $ {
	
	const { separated, repeat_greedy, char_except, from: regexp, line_end, end } = $mol_regexp
	
	export function $mol_csv_syntax_make( delimiter: string ) {
		
		const cell = regexp({
			quote: [ '"', separated( repeat_greedy( char_except( '"' ), 1 ), '""' ), '"' ],
			inline: repeat_greedy( char_except( '"\n' + delimiter ), 1 ),
		})
			
		const row = regexp([
			{ row: separated( cell, delimiter ) },
			{ line_end, end },
		])
		
		const table = repeat_greedy( row, 1 )
		
		return { cell, row, table }
		
	}
	
	const cache = {} as Record< string, ReturnType< typeof $mol_csv_syntax_make > >
	
	export function $mol_csv_syntax( delimiter: string ) {
		if( cache[ delimiter ] ) return cache[ delimiter ]
		return cache[ delimiter ] = $mol_csv_syntax_make( delimiter )
	}
	
}
