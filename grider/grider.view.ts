namespace $.$mol {
	
	export interface $mol_grider_node {
		id : string
		parent : $mol_grider_node
		childs : $mol_grider_node[]
	}
	
	export class $mol_grider extends $.$mol_grider {
		
		@ $mol_mem()
		rowersVisible() {
			const rowers = this.rowers()
			if( !rowers ) return null
			
			const viewWindow = this.viewWindow()
			
			return [].concat(
				this.cols() && this.header() ,
				( viewWindow.top > 0 ) ? this.gaperTop() : null ,
				rowers.slice( viewWindow.top , viewWindow.bottom ).valueOf() ,
				( viewWindow.bottom < viewWindow.count ) ? this.gaperBottom() : null ,
			)
		}
		
		@ $mol_mem()
		viewWindow() {
			const rowers = this.rowers()
			if( !rowers ) return null
			
			const count = rowers.length
			const context = this.contextSub()
			const scrollTop = context.$mol_scroller_scrollTop()
			const heightLimit = context.$mol_viewer_visibleHeight()
			const rowHeight = this.rowHeight()
			
			const top = Math.max( 0 , Math.floor( scrollTop / rowHeight ) - 2 )
			const bottom = Math.min( count , Math.ceil( heightLimit / rowHeight ) + 2 )
			
			return { top , bottom , count }
		}
		
		gapTop() {
			const viewWindow = this.viewWindow()
			return viewWindow.top * this.rowHeight()
		}
		
		gapBottom() {
			const viewWindow = this.viewWindow()
			return ( viewWindow.count - viewWindow.bottom ) * this.rowHeight()
		}
		
		@ $mol_mem()
		headerCellers() {
			return this.cols().map( colId => this.columnHeader( colId ) )
		}
		
		@ $mol_mem()
		columnHeaderContent( colId : string ) {
			return [ colId ]
		}
		
		rowers() {
			return this.rows().map( row => this.rower( row ) )
		}
		
		cellers( row : string[] ) {
			return this.cols().map( col => this.celler({ row , col }) )
		}
		
		@ $mol_mem_key()
		colType( col : string ) {
			if( col === this.hierarchyColumn() ) return 'branch'
			
			const rowFirst = this.row(0)
			const val = this.record( rowFirst[ rowFirst.length -1 ] )[ col ]
			if( typeof val === 'number' ) return 'number'
			
			return 'text'
		}
		
		celler( id : { row : string[] , col : string } ) : $mol_viewer {
			switch( this.colType( id.col ).valueOf() ) {
				case 'branch' : return this.cellerBranch( id )
				case 'number' : return this.cellerNumber( id )
			}
			
			return this.cellerText( id )
		}
		
		cellerContent( id : { row : string[] , col : string } ) {
			return [ this.record( id.row[ id.row.length - 1 ] )[ id.col ] ]
		}
		
		records() : any {
			return []
		}
		
		record( id : string ) {
			return this.records()[ id ]
		}
		
		@ $mol_mem()
		ids() {
			return Object.keys( this.records() )
		}
		
		row( index : number ) {
			return ( this.rows().slice( index , index + 1 ).valueOf() as string[] )[0]
		}

		cols() {
			const rowFirst = this.row(0)
			if( rowFirst === void 0 ) return null
			
			const record = this.record( rowFirst[ rowFirst.length - 1 ] )
			if( !record ) return []
			
			return Object.keys( record )
		}
		
		@ $mol_mem()
		hierarchy() {
			const hierarchy : { [ id : string ] : $mol_grider_node } = {}
			const root = hierarchy[ '' ] = {
				id : '' ,
				parent : null as $mol_grider_node ,
				childs : [] as $mol_grider_node[] ,
			}
			this.ids().map( id => {
				root.childs.push( hierarchy[ id ] = {
					id ,
					parent : root ,
					childs : [] ,
				} )
			} )
			return hierarchy
		}
		
		rowsSub( row : string[] ) : string[][] {
			return this.hierarchy()[ row[ row.length - 1 ] ].childs.map( child => row.concat( child.id ) )
		}
		
		rowRoot() : string[] {
			return [ '' ]
		}
		
		cellerLevel( id : { row : string[] } ) {
			return id.row.length
		}
		
		@ $mol_mem()
		rows() {
			const next : string[][] = []
			
			const add = ( row : string[] )=> {
				next.push( row )
				if( this.rowExpanded( row ) ) {
					this.rowsSub( row ).forEach( child => add( child ) )
				}
			}
			
			this.rowsSub( this.rowRoot() ).forEach( child => add( child ) )
			
			return next
		}
		
		rowExpanded( row : string[] , next? : boolean ) {
			if( !this.rowsSub( row ).length ) return null
			
			const key = `rowExpanded(${ JSON.stringify( row ) })`
			const next2 = $mol_state_session.value( key , next )
			
			return ( next2 == null ) ? false : next2
		}
		
		cellerExpanded( id : { row : string[] } , next? : boolean ) {
			return this.rowExpanded( id.row , next )
		}
	}
	
	export class $mol_grider_gaper extends $.$mol_grider_gaper {
		
		heightStyle() {
			return `${ this.height() }px`
		}
		
	}
	
	export class $mol_grider_rower extends $.$mol_grider_rower {
		
		heightStyle() {
			return `${ this.height() }px`
		}
		
	}
	
}
