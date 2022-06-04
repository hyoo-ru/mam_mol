namespace $.$$ {
	export class $mol_text_code extends $.$mol_text_code {
		
		render_visible_only() {
			return this.$.$mol_support_css_overflow_anchor()
		}
		
		@ $mol_mem
		text_lines() {
			return this.text().split( '\n' ) as readonly string[]
		}
		
		@ $mol_mem
		rows() {
			return this.text_lines().map( ( _ , index )=> this.Row( index + 1 ) )
		}

		@ $mol_mem_key
		row_text( index: number ) {
			return this.text_lines()[ index - 1 ]
		}
		
		row_numb( index: number ) {
			return index
		}
		
		@ $mol_mem_key
		find_pos( offset: number ) {
			
			for( const [ index, line ] of this.text_lines().entries() ) {
				if( line.length >= offset ) {
					return this.Row( index + 1 ).find_pos( offset )
				} else {
					offset -= line.length + 1
				}
			}
			
			return null
		}
		
		@ $mol_mem
		sub() {
			return [
				this.Rows(),
				... this.sidebar_showed() ? [ this.Copy() ] : []
			]
		}
		
	}
}
