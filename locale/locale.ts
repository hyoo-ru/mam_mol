class $mol_locale extends $mol_object {
	
	@ $mol_prop()
	static lang( ...diff : string[] ) {
		return diff[0] || 'en'
	}
	
	static texts() {
		return $mol_http_resource.item( `-/web.locale=${ this.lang() }.json` ).json<{ [ key : string ] : string }>()
	}
	
	static text( context : string , key : string ) {
		return this.texts()[ `${ context }_${ key }` ]
	}
	
}
