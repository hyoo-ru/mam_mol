namespace $ {
	
	export class $mol_http_resource_json< Content > extends $mol_http_resource {
		
		@ $mol_mem_key()
		static item< Content >( uri : string ) {
			return new $mol_http_resource_json< Content >().setup(
				obj => {
					obj.uri = () => uri
				}
			)
		}
		
		json( next? : Content , force? : $mol_atom_force ) : Content {
			return JSON.parse( this.text( next && JSON.stringify( next , null , '\t' ) , force ) )
		}
		
	}

}
