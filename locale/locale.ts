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
		static texts() {
			const uri = `-/web.locale=${ this.lang() }.json`
			const resource = $mol_http_resource_json.item< $mol_locale_dict >( uri ) 
			return resource.json()
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
