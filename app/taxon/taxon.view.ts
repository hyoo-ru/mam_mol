namespace $.$$ {
	
	export interface $mol_app_taxon_data_row {
		KeyId : number
	}
	
	export class $mol_app_taxon extends $.$mol_app_taxon {
		
		hierarchy_uri() {
			return 'http://justine.saprun.com:8000/sap/opu/odata/sap/ZTRNF_TEST_DATA_SRV/TRNF_TREESet?$'+'format=json'
		}
		
		@ $mol_mem
		hierarchy() {
			type response = { d : {
				results : {
					KeyId : number
					ParentId : number
				}[]
			} }

			const resource = $mol_http.resource( this.hierarchy_uri() ) 
			resource.credentials = $mol_const({})

			const hierarchy : { [ key : string ] : $mol_grid_node } = {}
			hierarchy[ '' ] = {
				id : '' ,
				parent : null ,
				sub : []
			}
			
			resource.json< response >().d.results.forEach( row => {
				const parent = hierarchy[ row.ParentId || '' ]
				const node = hierarchy[ row.KeyId ] = {
					id : `${ row.KeyId }` ,
					parent ,
					sub : [] as $mol_grid_node[] ,
				}
				parent.sub.push( node )
			} )

			return hierarchy
		}
		
		data_uri() {
			return 'http://justine.saprun.com:8000/sap/opu/odata/sap/ZTRNF_TEST_DATA_SRV/TRNF_DATASet?$'+'format=json'
		}
		
		data_resource( id : string ) {
			const uri = this.data_uri() + '&$' + 'filter=' + encodeURIComponent( `KeyId eq ${ id }` )
			const resource = $mol_http.resource( uri )
			resource.credentials = $mol_const({})
			return resource
		}
		
		@ $mol_mem
		data_table() {
			return {} as { [ id : string ] : $mol_app_taxon_data_row }
		}
		
		@ $mol_mem_key
		record( id : string ) {
			if( !id ) return {} as $mol_app_taxon_data_row
			
			const cache = this.data_table()
			if( cache[ id ] ) return cache[ id ]
			
			const next = this.data_resource( id ).json<any>().d.results[0] as $mol_app_taxon_data_row
			delete ( next as any ).__metadata
			
			return cache[ id ] = next 
		}
		
	}
	
}
