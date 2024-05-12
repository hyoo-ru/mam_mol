namespace $.$$ {

	/**
	 * Code visualizer.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_text_code_demo
	 */
	export class $mol_text_code extends $.$mol_text_code {
		
		render_visible_only() {
			return this.$.$mol_support_css_overflow_anchor()
		}
		
		@ $mol_mem
		text_lines() {
			return ( this.text() ?? '' ).split( '\n' ) as readonly string[]
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
		
		syntax() {
			return this.$.$mol_syntax2_md_code
		}

		uri_base() {
			return $mol_dom_context.document.location.href
		}
		
		@ $mol_mem_key
		uri_resolve( uri: string ) {
			
			if( /^(\w+script+:)+/.test( uri ) ) return null as any as string
			
			try {
				
				const url = new URL( uri , this.uri_base() )
				return url.toString()
				
			} catch( error ) {
				
				$mol_fail_log( error )
				return null as any as string
				
			}
			
		}
		
		text_export() {
			return this.text() + '\n'
		}
		
	}
}
