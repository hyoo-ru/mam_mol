namespace $.$mol {
	
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
			const heightLimit = context.$mol_viewer_heightLimit()
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
		
		cellers( row : string ) {
			return this.cols().map( col => this.celler({ row , col }) )
		}
		
		@ $mol_mem_key()
		colType( col : string ) {
			if( col === this.hierarhyColumn() ) return 'branch'
			
			const val = this.record( this.row(0) )[ col ]
			if( typeof val === 'number' ) return 'number'
			
			return 'text'
		}
		
		celler( id : { row : string , col : string } ) : $mol_viewer {
			switch( this.colType( id.col ).valueOf() ) {
				case 'branch' : return this.cellerBranch( id )
				case 'number' : return this.cellerNumber( id )
			}
			
			return this.cellerText( id )
		}
		
		cellerContent( id : { row : string , col : string } ) {
			return [ this.record( id.row )[ id.col ] ]
		}
		
		records() : any {
			return []
		}
		
		record( row : string ) {
			return this.records()[ row ]
		}
		
		@ $mol_mem()
		rows() {
			return Object.keys( this.records() )
		}
		
		row( row : number ) {
			return ( this.rows().slice( 0 , 1 ).valueOf() as string[] )[0]
		}
		
		cols() {
			const rowFirst = this.row(0)
			if( rowFirst === void 0 ) return null
			
			return Object.keys( this.record( rowFirst ) )
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
	
	export class $mol_grider_branch extends $.$mol_grider_branch {
		
		levelStyle() {
			return `${ this.level() *.75 - 1.5 }rem`
		}
		
		expandable() {
			return this.expanded() !== null
		}
		
	}
	
}
