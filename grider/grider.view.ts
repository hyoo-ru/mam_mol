namespace $.$mol {
	
	export class $mol_grider extends $.$mol_grider {
		
		@ $mol_mem()
		childs() {
			const rowers = this.rowers()
			if( !rowers ) return null
			
			const viewWindow = this.viewWindow()
			
			return [].concat(
				this.header() ,
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
			const context = this.context()
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
		columnTitle( colId : string ) {
			return colId
		}
		
		rowers() {
			return this.rows().map( ( row , index )=> this.rower( index ) )
		}
		
		cellers( rowId : number ) {
			return this.cols().map( colId => this.celler({ row : rowId , col : colId }) )
		}
		
		celler( id : { row : number , col : string } ) {
			const val = this.row( id.row )[ id.col ]
			if( typeof val === 'number' ) return this.cellerNumber( id )
			return this.cellerText( id )
		}
		
		cellerContent( id : { row : number , col : string } ) {
			return [ this.row( id.row )[ id.col ] ]
		}
		
		row( index : number ) {
			return ( this.rows().slice( index , index + 1 ).valueOf() as any[] )[0]
		}
		
		cols() {
			return Object.keys( this.row( 0 ) || {} )
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
