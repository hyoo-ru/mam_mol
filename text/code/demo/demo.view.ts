namespace $.$$ {
	export class $mol_text_code_demo extends $.$mol_text_code_demo {

		@ $mol_mem
		source() {
			return this.$.$mol_fetch.text( 'web.js' )
		}
		
		@ $mol_mem
		syntax() {
			return new $mol_syntax2({
				... this.$.$mol_syntax2_md_code.lexems,
				'code-link' : /\$\w+(?:_\w+)*/ ,
			})
		}
		
		uri_resolve( uri: string ) {
			return `https://github.com/search?l=Markdown&q=org%3Ahyoo-ru+${ encodeURIComponent( uri ) }&type=Code`
		}

	}
}
