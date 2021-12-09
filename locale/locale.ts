namespace $ {
	
	export interface $mol_locale_dict {
		[ key : string ] : string
	}
	
	export class $mol_locale extends $mol_object {
		
		@ $mol_mem
		static lang_default() {
			return 'en'
		}
		
		@ $mol_mem
		static lang( next? : string ) {
			return $mol_state_local.value( 'locale' , next ) || $mol_dom_context.navigator.language.replace( /-.*/ , '' ) || this.lang_default()
		}
		
		@ $mol_mem_key
		static source( lang : string ) {
			return JSON.parse( $mol_file.relative( `web.locale=${ lang }.json` ).text().toString() )
		}
		
		@ $mol_mem_key
		static texts( lang : string , next? : $mol_locale_dict ) : $mol_locale_dict {
			if( next ) return next
			
			try {
				return this.source( lang ).valueOf()
			} catch( error: any ) {
				if( error instanceof Promise ) $mol_fail_hidden( error )
				const def = this.lang_default()
				if( lang === def ) throw error
				return this.source( def )
			}
		}
		
		@ $mol_mem_key
		static text( key : string ) {

			for( let lang of [ this.lang() , 'en' ] ) {
				
				const text = this.texts( lang )[ key ]
				if( text ) return text

				this.warn( key )
			}
						
			return `<${ key }>`
		}
		
		@ $mol_mem_key
		static warn( key : string ) {
			console.warn( `Not translated to "${ this.lang() }": ${ key }` )
			return null
		}
		
	}
	
}
