namespace $.$$ {
	export class $mol_text_code extends $.$mol_text_code {
		
		@ $mol_mem_key
		tokens( path: number[] ) {

			const tokens = [] as { name : string , found : string , chunks: string[] }[]
			
			const text = ( path.length > 1 )
				// @FIXME: this logic compatible only with `string`
				? this.tokens( path.slice( 0, path.length - 1 ) )[ path[ path.length - 1 ] ].found.slice( 1, -1 )
				: this.text_lines()[ path[0] ]
			
			this.$.$mol_syntax2_md_code.tokenize(
				text,
				( name , found , chunks )=> tokens.push({ name , found , chunks }),
			)
			
			return tokens as Readonly< typeof tokens >
		}

		@ $mol_mem
		text_lines() {
			return this.text().split( '\n' ) as readonly string[]
		}
		
		@ $mol_mem
		rows() {
			return this.text_lines().map( ( _ , index )=> this.Row([ index ]) )
		}

		@ $mol_mem_key
		row_content( path: number[] ) {
			return this.tokens( path ).map( (t,i)=> t.name ? this.Token([ ... path, i ]) : t.found )
		}
		
		@ $mol_mem_key
		token_type( path: number[] ) {
			return this.tokens( [ ... path.slice( 0, path.length - 1 ) ] )[ path[ path.length - 1 ] ].name
		}
		
		@ $mol_mem_key
		token_content( path: number[] ) {

			const tokens = this.tokens( [ ... path.slice( 0, path.length - 1 ) ] ) 
			const token = tokens[ path[ path.length - 1 ] ]

			switch( token.name ) {
				
				case 'code-string': return [
					token.found[0],
					... this.row_content( path ),
					token.found[ token.found.length - 1 ],
				] 
				
				default: return [ token.found ]
			}

		}
		
	}
}
