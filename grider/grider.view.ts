module $.$mol {
	
	export class $mol_grider extends $.$mol_grider {
		
		@ $mol_prop()
		childs() {
			const rows = this.rows()
			if( !rows ) return null
			
			const viewWindow = this.viewWindow()
			
			return [].concat(
				this.header() ,
				( viewWindow.top > 0 ) ? this.gaperTop() : null ,
				rows.slice( viewWindow.top , viewWindow.bottom ).valueOf() ,
				( viewWindow.bottom < viewWindow.count ) ? this.gaperBottom() : null ,
			)
		}
		
		@ $mol_prop()
		viewWindow() {
			const rows = this.rows()
			if( !rows ) return null
			
			const count = rows.length
			const context = this.context()
			const scrollTop = context.$mol_scroller_scrollTop()
			const heightLimit = context.$mol_viewer_heightLimit()
			const rowHeight = this.rowHeight()
			
			const top = Math.max( 0 , Math.floor( ( scrollTop * 1.5 - heightLimit / 2 ) / rowHeight ) )
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
		
	}
	
	export class $mol_grider_gaper extends $.$mol_grider_gaper {
		
		heightStyle() {
			return `${ this.height() }px`
		}
		
	}
	
	export class $mol_grider_header extends $.$mol_grider_header {
		
		shiftStyle() {
			const offset = this.context().$mol_scroller_scrollTop()
			return `translateY( ${ offset }px )`
		}
		
	}
	
}
