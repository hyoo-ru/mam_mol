module $ {
	
	export class $mol_locale extends $mol_object {
		
		@ $mol_prop()
		static lang( ...diff : string[] ) {
			return diff[ 0 ] || 'en'
		}
		
		static texts() {
			const resource = $mol_http_resource.item( `-/web.locale=${ this.lang() }.json` ) 
			return resource.json<{ [ key : string ] : string }>()
		}
		
		static text( context : string , key : string ) {
			return this.texts()[ `${ context }_${ key }` ]
		}
		
	}
	
}
