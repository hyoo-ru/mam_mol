namespace $.$$ {

	export class $mol_text_code_row extends $.$mol_text_code_row {
		
		maximal_width() {
			return this.text().length * this.letter_width()
		}

		@ $mol_mem_key
		tokens( path: number[] ) {

			const tokens = [] as { name : string , found : string , chunks: string[] }[]
			
			const text = ( path.length > 0 )
				// @FIXME: this logic compatible only with `string`
				? this.tokens( path.slice( 0, path.length - 1 ) )[ path[ path.length - 1 ] ].found.slice( 1, -1 )
				: this.text()
			
			this.$.$mol_syntax2_md_code.tokenize(
				text,
				( name , found , chunks )=> tokens.push({ name , found , chunks }),
			)
			
			return tokens as Readonly< typeof tokens >
		}

		sub() {
			return [
				... this.numb_showed() ? [ this.Numb() ] : [],
				... this.row_content([])
			]
		}

		@ $mol_mem_key
		row_content( path: number[] ) {
			return this.tokens( path ).map( (t,i)=> this.Token([ ... path, i ]) )
		}

		Token( path: number[] ) {
			return this.token_type( path ) === 'code-link' ? this.Token_link( path ) : super.Token( path )
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
		
		@ $mol_mem_key
		token_text( path: number[] ) {

			const tokens = this.tokens( [ ... path.slice( 0, path.length - 1 ) ] ) 
			const token = tokens[ path[ path.length - 1 ] ]

			return token.found

		}
		
		*view_find(
			check: ( path : $mol_view, text?: string )=> boolean,
			path = [] as $mol_view[],
		): Generator< $mol_view[] > {

			if( check( this, this.text() ) ) {
				yield [ ... path, this ]
			}
			
		}

	}

}
