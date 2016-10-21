module $.$mol {
	
	export interface $mol_app_taxon_hierarhy_node {
		id : number
		parent : $mol_app_taxon_hierarhy_node
		childs : $mol_app_taxon_hierarhy_node[]
	}
	
	export interface $mol_app_taxon_data_row {
		id : number
		title : string
		countryName : string
		currency : string
		grade : string
		date : string
		cost : string
	}
	
	export class $mol_app_taxon extends $.$mol_app_taxon {
		
		hierarhyUri() {
			return 'http://justine.saprun.com:8000/fmcall/ZTRNF_FM_TEST?format=json'
		}
		
		dataUri() {
			return 'http://justine.saprun.com:8000/fmcall/ZTRNF_FM_TEST_DATA?format=json'
		}
		
		@ $mol_prop()
		hierarhy() {
			type response = {
				ET_DATA : {
					KEY_ID : number
					PARENT_ID : number
				}[]
			}

			const resource = $mol_http_resource_json.item< response >( this.hierarhyUri() ) 
			resource.credentials = ()=> ({})

			const hierarhy : { [ key : number ] : $mol_app_taxon_hierarhy_node } = {}
				hierarhy[ 0 ] = {
					id : 0 ,
					parent : null ,
					childs : []
				}
			
			resource.json().ET_DATA.forEach( row => {
				const parent = hierarhy[ row.PARENT_ID ]
				const node = hierarhy[ row.KEY_ID ] = {
					id : row.KEY_ID ,
					parent ,
					childs : [] as $mol_app_taxon_hierarhy_node[] ,
				}
				parent.childs.push( node )
			} )

			return hierarhy
		}
		
		@ $mol_prop()
		dataTable() {
			type response = {
				ET_DATA : {
					KEY_ID : number
					BUKRS : string
					BUTXT : string
					FMHRDATE : string
					FSTVA : string
					KTOP2 : string
					KTOPL : string
					LAND1 : string
					MANDT : string
					OPVAR : string
					ORT01 : string
					PERIV : string
					WAERS : string
				}[]
			}
			
			const resource = $mol_http_resource_json.item< response >( this.dataUri() )
			resource.credentials = ()=> ({})
			
			const dataTable : { [ key : number ] : $mol_app_taxon_data_row } = {}
			
			resource.json().ET_DATA.forEach( row => {
				dataTable[ row.KEY_ID ] = {
					id : row.KEY_ID ,
					title : row.BUTXT ,
					countryName : row.ORT01 ,
					currency : row.WAERS ,
					grade : row.PERIV ,
					date : row.FMHRDATE ,
					cost : row.MANDT ,
				}
			} )
			
			return dataTable
		}
		
		@ $mol_prop()
		row( path : number[] ) {
			return this.dataTable()[ path[ path.length - 1 ] ]
		}
		
		pathsSub( path : number[] ) : number[][] {
			return this.hierarhy()[ path[ path.length - 1 ] ].childs.map( child => path.concat( child.id ) )
		}

		pathRoot() : number[] {
			return [0]
		}
		
		@ $mol_prop()
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
		
		@ $mol_prop()
		rowers() {
			const paths = this.pathsAll()
			return new $mol_range_lazy( {
				length : paths.length ,
				get : index => this.grider().rower( paths[ index ] ) ,
			} )
		}
		
		@ $mol_prop()
		cellers( path : number[] ) {
			const next : $mol_viewer[] = []
			const hierarhyField = this.hierarhyField() 
			
			next.push( this.cellerBranch( path ) )
			
			const row : any = this.row( path )
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
		
		rowExpanded( path : number[] , ...diff : boolean[] ) {
			if( !this.pathsSub( path ).length ) return null
			
			const key = `rowExpanded(${ JSON.stringify( path ) })`
			const next = $mol_state_session.value( key , ...diff )
			
			return ( next === null ) ? false : next
		}
		
		rowTitle( path : number[] ) {
			return this.row( path ) && ( this.row( path ) as any )[ this.hierarhyField() ]
		}
		
	}
	
}
