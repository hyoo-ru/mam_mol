namespace $ {
	
	export interface $mol_locale_dict {
		[ key : string ] : string
	}
	
	export class $mol_locale extends $mol_object {
		
		@ $mol_mem()
		static lang( next? : string ) {
			return $mol_state_local.value( 'locale' , next ) || $mol_state_arg.value( 'locale' ) || 'en'
		}
		
		@ $mol_mem()
		static texts( next? : $mol_locale_dict ) {
			if( next ) return next
			
			const path = `-/web.locale=${ this.lang() }.json`
			const content = $mol_file.relative( path ).content() 
			
			return JSON.parse( content ) as $mol_locale_dict
		}
		
		static text( contexts : string[] , key : string ) {
			const texts = this.texts()
			
			for( let i = 0 ; i < contexts.length ; ++i ) {
				const text = texts[ `${ contexts[i] }_${ key }` ]
				if( text ) return text
			}
			
			console.warn( 'Locale tet not found: ' , contexts , key )
			
			return `<${ key }>`
		}
		
	}
	
}
