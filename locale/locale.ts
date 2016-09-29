module $ {
	
	export interface $mol_locale_dict {
		[ key : string ] : string
	}
	
	export class $mol_locale extends $mol_object {
		
		@ $mol_prop()
		static lang( ...diff : string[] ) {
			return diff[ 0 ] || 'en'
		}
		
		static texts() {
			const uri = `-/web.locale=${ this.lang() }.json`
			const resource = $mol_http_resource_json.item< $mol_locale_dict >( uri ) 
			return resource.json()
		}
		
		static text( context : string , key : string ) {
			return this.texts()[ `${ context }_${ key }` ]
		}
		
	}
	
}
