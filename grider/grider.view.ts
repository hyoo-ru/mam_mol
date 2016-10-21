module $.$mol {
	
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
			
			const top = Math.max( 0 , Math.floor( ( scrollTop ) / rowHeight ) )
			const bottom = Math.min( Math.ceil( heightLimit / rowHeight ) , count )
			
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
			return this.cellers( [] ).map( ( celler , index )=> this.cellerHeader( index ) )
		}
		
		@ $mol_mem()
		cellerTitle( index : number ) {
			return this.cellers( [] )[ index ].title();
		}
		
	}
	
	export class $mol_grider_gaper extends $.$mol_grider_gaper {
		
		heightStyle() {
			return `${ this.height() }px`
		}
		
	}
	
	export class $mol_grider_rower extends $.$mol_grider_rower {
		
		heightStyle() {
			return `${ this.height() - 1 }px`
		}
		
	}
	
	export class $mol_app_grider_branch extends $.$mol_app_grider_branch {
		
		levelStyle() {
			return `${ this.level() * 1 - 1.75 }rem`
		}
		
		expandable() {
			return this.expanded() !== null
		}
		
	}
	
}
