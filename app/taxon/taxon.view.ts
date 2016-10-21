module $.$mol {
	
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
		
		@ $mol_mem()
		row( path : number[] ) {
			const id = path[ path.length - 1 ]
			if( !id ) return {} as $mol_app_taxon_data_row
			
			const cache = this.dataTable()
			if( cache[ id ] ) return cache[ id ]
			
			const next = this.dataResource( id ).json().d.results[0] as $mol_app_taxon_data_row
			delete ( next as any ).__metadata
			
			return cache[ id ] = next 
		}
		
		pathsSub( path : number[] ) : number[][] {
			return this.hierarhy()[ path[ path.length - 1 ] ].childs.map( child => path.concat( child.id ) )
		}

		pathRoot() : number[] {
			return [0]
		}
		
		@ $mol_mem()
		pathsAll() {
			const next : number[][] = []
			
			const add = ( path : number[] )=> {
				next.push( path )
				if( this.rowExpanded( path ) ) {
					this.pathsSub( path ).forEach( path => add( path ) )
				}
			}
			
			this.pathsSub( this.pathRoot() ).forEach( path => add( path ) )
			
			return next
		}
		
		@ $mol_mem()
		rowers() {
			const paths = this.pathsAll()
			return new $mol_range_lazy( {
				length : paths.length ,
				item : index => this.grider().rower( paths[ index ] ) ,
			} )
		}
		
		@ $mol_mem_key()
		cellers( path : number[] ) {
			const next : $mol_viewer[] = []
			const hierarhyField = this.hierarhyField() 
			
			next.push( this.cellerBranch( path ) )
			
			const row : any = this.row( [1] )
			for( let field in row ) {
				if( field === hierarhyField ) continue
				if( typeof row[ field ] === 'number' ) {
					next.push( this.cellerNumber({ path : path , field }) )
				} else {
					next.push( this.cellerText({ path : path , field }) )
				}
			}
			
			return next
		}
		
		cellerTitle( id : { path : number[] , field : string } ) {
			return id.field;
		}
		
		valueText( id : { path : number[] , field : string } ) : string {
			return ( this.row( id.path ) as any )[ id.field ];
		}
		
		valueNumber( id : { path : number[] , field : string } ) : number {
			return ( this.row( id.path ) as any )[ id.field ];
		}
		
		rowLevel( path : number[] ) {
			return path.length
		}
		
		rowExpanded( path : number[] , next? : boolean ) {
			if( !this.pathsSub( path ).length ) return null
			
			const key = `rowExpanded(${ JSON.stringify( path ) })`
			const next2 = $mol_state_session.value( key , next )
			
			return ( next2 === null ) ? false : next2
		}
		
		rowTitle( path : number[] ) {
			return this.row( path ) && ( this.row( path ) as any )[ this.hierarhyField() ]
		}
		
	}
	
}
