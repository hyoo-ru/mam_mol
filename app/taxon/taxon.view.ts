namespace $.$mol {
	
	export interface $mol_app_taxon_data_row {
		KeyId : number
	}
	
	export class $mol_app_taxon extends $.$mol_app_taxon {
		
		hierarchyUri() {
			return 'http://justine.saprun.com:8000/sap/opu/odata/sap/ZTRNF_TEST_DATA_SRV/TRNF_TREESet?$'+'format=json'
		}
		
		@ $mol_mem()
		hierarchy() {
			type response = { d : {
				results : {
					KeyId : number
					ParentId : number
				}[]
			} }

			const resource = $mol_http_resource_json.item< response >( this.hierarchyUri() ) 
			resource.credentials = $mol_const({})

			const hierarchy : { [ key : string ] : $mol_grider_node } = {}
			hierarchy[ '' ] = {
				id : '' ,
				parent : null ,
				childs : []
			}
			
			resource.json().d.results.forEach( row => {
				const parent = hierarchy[ row.ParentId ]
				const node = hierarchy[ row.KeyId ] = {
					id : `${ row.KeyId }` ,
					parent ,
					childs : [] as $mol_grider_node[] ,
				}
				parent.childs.push( node )
			} )

			return hierarchy
		}
		
		dataUri() {
			return 'http://justine.saprun.com:8000/sap/opu/odata/sap/ZTRNF_TEST_DATA_SRV/TRNF_DATASet?$'+'format=json'
		}
		
		dataResource( id : string ) {
			const uri = this.dataUri() + '&$' + 'filter=' + encodeURIComponent( `KeyId eq ${ id }` )
			const resource = $mol_http_resource_json.item<any>( uri )
			resource.credentials = $mol_const({})
			return resource
		}
		
		@ $mol_mem()
		dataTable() {
			return {} as { [ id : string ] : $mol_app_taxon_data_row }
		}
		
		@ $mol_mem_key()
		record( id : string ) {
			if( !id ) return {} as $mol_app_taxon_data_row
			
			const cache = this.dataTable()
			if( cache[ id ] ) return cache[ id ]
			
			const next = this.dataResource( id ).json().d.results[0] as $mol_app_taxon_data_row
			delete ( next as any ).__metadata
			
			return cache[ id ] = next 
		}
		
	}
	
}
