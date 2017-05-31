namespace $ {
	
	console.warn( '$mol_http_resource* is deprecated. Use $mol_http.resource insted.' )

	export class $mol_http_resource extends $mol_http {
		
		static item( uri : string ) {
			return $mol_http.resource( uri )
		}
		
	}
	
	export class $mol_http_resource_json {
		
		static item( uri : string ) {
			return $mol_http.resource( uri )
		}
		
	}
	
}
