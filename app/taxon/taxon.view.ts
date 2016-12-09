namespace $.$mol {
	
	export interface $mol_app_taxon_hierarhy_node {
		id : number
		parent : $mol_app_taxon_hierarhy_node
		childs : $mol_app_taxon_hierarhy_node[]
	}
	
	export interface $mol_app_taxon_data_row {
		KeyId : number
	}
	
	export class $mol_app_taxon extends $.$mol_app_taxon {
		
		hierarhyUri() {
			return 'http://justine.saprun.com:8000/sap/opu/odata/sap/ZTRNF_TEST_DATA_SRV/TRNF_TREESet?$'+'format=json'
		}
		
		@ $mol_mem()
		hierarhy() {
			type response = { d : {
				results : {
					KeyId : number
					ParentId : number
				}[]
			} }

			const resource = $mol_http_resource_json.item< response >( this.hierarhyUri() ) 
			resource.credentials = $mol_const({})

			const hierarhy : { [ key : number ] : $mol_app_taxon_hierarhy_node } = {}
				hierarhy[ 0 ] = {
					id : 0 ,
					parent : null ,
					childs : []
				}
			
			resource.json().d.results.forEach( row => {
				const parent = hierarhy[ row.ParentId ]
				const node = hierarhy[ row.KeyId ] = {
					id : row.KeyId ,
					parent ,
					childs : [] as $mol_app_taxon_hierarhy_node[] ,
				}
				parent.childs.push( node )
			} )

			return hierarhy
		}
		
		dataUri() {
			return 'http://justine.saprun.com:8000/sap/opu/odata/sap/ZTRNF_TEST_DATA_SRV/TRNF_DATASet?$'+'format=json'
		}
		
		dataResource( id : number ) {
			const uri = this.dataUri() + '&$' + 'filter=' + encodeURIComponent( `KeyId eq ${ id }` )
			const resource = $mol_http_resource_json.item<any>( uri )
			resource.credentials = $mol_const({})
			return resource
		}
		
		@ $mol_mem()
		dataTable() {
			return [] as $mol_app_taxon_data_row[]
		}
		
		@ $mol_mem_key()
		record( path : number[] ) {
			const id = path[ path.length - 1 ]
			if( !id ) return {} as $mol_app_taxon_data_row
			
			const cache = this.dataTable()
			if( cache[ id ] ) return cache[ id ]
			
			const next = this.dataResource( id ).json().d.results[0] as $mol_app_taxon_data_row
			delete ( next as any ).__metadata
			
			return cache[ id ] = next 
		}
		
		rowsSub( path : number[] ) : number[][] {
			return this.hierarhy()[ path[ path.length - 1 ] ].childs.map( child => path.concat( child.id ) )
		}

		rowRoot() : number[] {
			return [0]
		}
		
		@ $mol_mem()
		rows() {
			const next : number[][] = []
			
			const add = ( path : number[] )=> {
				next.push( path )
				if( this.branchExpanded( path ) ) {
					this.rowsSub( path ).forEach( path => add( path ) )
				}
			}
			
			this.rowsSub( this.rowRoot() ).forEach( path => add( path ) )
			
			return next
		}
		
		@ $mol_mem()
		records() {
			const paths = this.rows()
			return $mol_range_in( {
				length : paths.length ,
				item : index => this.record( paths[ index ] ) ,
			} )
		}
		
		branchExpanded( path : number[] , next? : boolean ) {
			if( !this.rowsSub( path ).length ) return null
			
			const key = `branchExpanded(${ JSON.stringify( path ) })`
			const next2 = $mol_state_session.value( key , next )
			
			return ( next2 == null ) ? false : next2
		}
		
		rowLevel( id : { row : number[] } ) {
			return id.row.length
		}
		
		rowExpanded( id : { row : number[] } , next? : boolean ) {
			return this.branchExpanded( id.row , next )
		}
		
	}
	
}
