namespace $.$$ {
	
	export interface $mol_grid_node {
		id : string
		parent : $mol_grid_node
		sub : $mol_grid_node[]
	}
	
	export class $mol_grid extends $.$mol_grid {
		
		@ $mol_mem
		head_cells() {
			return this.col_ids().map( colId => this.Col_head( colId ) ) as readonly $mol_view[]
		}
		
		col_head_content( colId : string ) {
			return [ colId ] as readonly string[]
		}
		
		@ $mol_mem
		rows() {
			return this.row_ids().map( id => this.Row( id ) ) as readonly $mol_view[]
		}
		
		cells( row_id : string[] ) {
			return this.col_ids().map( col_id => this.Cell({ row : row_id , col : col_id }) ) as readonly $mol_view[]
		}
		
		@ $mol_mem_key
		col_type( col_id : string ) {
			if( col_id === this.hierarchy_col() ) return 'branch'
			
			const rowFirst = this.row_id( 0 )
			const val = this.record( rowFirst[ rowFirst.length -1 ] )[ col_id ]
			if( typeof val === 'number' ) return 'number'
			
			return 'text'
		}
		
		Cell( id : { row : string[] , col : string } ) : $mol_view {
			switch( this.col_type( id.col ).valueOf() ) {
				case 'branch' : return this.Cell_branch( id )
				case 'number' : return this.Cell_number( id )
			}
			
			return this.Cell_text( id )
		}
		
		cell_content( id : { row : string[] , col : string } ) {
			return [ this.record( id.row[ id.row.length - 1 ] )[ id.col ] ]
		}
		
		cell_content_text( id : { row : string[] , col : string } ) {
			return this.cell_content( id ).map( val => typeof val === 'object' ? JSON.stringify( val ) : val )
		}
		
		records() : any {
			return []
		}
		
		record( id : string ) {
			return this.records()[ id ]
		}
		
		@ $mol_mem
		record_ids() {
			return Object.keys( this.records() )
		}
		
		row_id( index : number ) {
			return ( this.row_ids().slice( index , index + 1 ).valueOf() as string[] )[0]
		}

		col_ids() {
			const rowFirst = this.row_id(0)
			if( rowFirst === void 0 ) return []
			
			const record = this.record( rowFirst[ rowFirst.length - 1 ] )
			if( !record ) return []
			
			return Object.keys( record ) as readonly string[]
		}
		
		@ $mol_mem
		hierarchy() {
			const hierarchy : { [ id : string ] : $mol_grid_node } = {}
			const root = hierarchy[ '' ] = {
				id : '' ,
				parent : null as any as $mol_grid_node ,
				sub : [] as $mol_grid_node[] ,
			}
			this.record_ids().map( id => {
				root.sub.push( hierarchy[ id ] = {
					id ,
					parent : root ,
					sub : [] ,
				} )
			} )
			return hierarchy
		}
		
		row_sub_ids( row : string[] ) : string[][] {
			return this.hierarchy()[ row[ row.length - 1 ] ].sub.map( child => row.concat( child.id ) )
		}
		
		row_root_id() : string[] {
			return [ '' ]
		}
		
		cell_level( id : { row : string[] } ) {
			return id.row.length - 1
		}
		
		@ $mol_mem
		row_ids() {
			const next : string[][] = []
			
			const add = ( row : string[] )=> {
				next.push( row )
				if( this.row_expanded( row ) ) {
					this.row_sub_ids( row ).forEach( child => add( child ) )
				}
			}
			
			this.row_sub_ids( this.row_root_id() ).forEach( child => add( child ) )
			
			return next as readonly string[][]
		}
		
		row_expanded( row_id : string[] , next? : boolean ) {
			if( !this.row_sub_ids( row_id ).length ) return null
			
			const key = `row_expanded(${ JSON.stringify( row_id ) })`
			const next2 = $mol_state_session.value( key , next )
			
			return ( next2 == null ) ? this.row_expanded_default( row_id ) : next2
		}
		
		row_expanded_default( row_id : string[] ) {
			return true
		}
		
		cell_expanded( id : { row : string[] } , next? : boolean ) {
			return this.row_expanded( id.row , next )!
		}
		
		override sub() {
			this.records()
			return super.sub()
		}
		
	}
	
}
