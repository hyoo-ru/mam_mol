namespace $ {
	
	export class $mol_http_resource extends $mol_http {
		
		@ $mol_deprecated( 'Use $mol_http.resource insted.' )
		static item( uri : string ) {
			return $mol_http.resource( uri )
		}
		
	}
	
	export class $mol_http_resource_json {
		
		@ $mol_deprecated( 'Use $mol_http.resource insted.' )
		static item( uri : string ) {
			return $mol_http.resource( uri )
		}
		
	}
	
}
