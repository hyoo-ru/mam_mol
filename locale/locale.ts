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
			return JSON.parse( $mol_file.relative( `-/web.locale=${ lang }.json` ).content() )
		}
		
		@ $mol_mem
		static texts( next? : $mol_locale_dict ) : $mol_locale_dict {
			if( next ) return next
			
			const lang = this.lang()
			
			try {
				return this.source( lang ).valueOf()
			} catch( error ) {
				const def = this.lang_default()
				if( lang === def ) throw error
				return this.source( def )
			}
		}
		
		static text( contexts : string[] , key : string ) {
			const texts = this.texts()
			
			for( let i = 0 ; i < contexts.length ; ++i ) {
				const text = texts[ `${ contexts[i] }_${ key }` ]
				if( text ) return text
			}
			
			console.warn( 'Locale text not found: ' , `(${ contexts.join( '|' ) })_${ key }` )
			
			return `<${ key }>`
		}
		
	}
	
}
