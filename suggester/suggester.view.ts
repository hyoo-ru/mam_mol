module $.$mol {
	
	export class $mol_suggester extends $.$mol_suggester {
		
		@ $mol_prop()
		contextSub( ) {
			var context = this.context()
			var subContext = Object.create( context )
			subContext.$mol_viewer_heightLimit = ()=> context.$mol_viewer_heightLimit() / 3
			return subContext
		}
		
		suggestRows() {
			return this.suggests().map( ( suggest , index )=> this.rower( index ) )
		}
		
		childs() {
			return [
				this.stringer() ,
				( this.focused() && this.suggests().length )
					? this.lister()
					: null
			]
		}
		
		eventRowerSelected( index : number , ...diff : MouseEvent[] ) {
			this.value( this.suggests()[ index ] );
		}
		
		@ $mol_prop()
		selectedRow( ...diff : any[] ) {
			this.value()
			return ( diff[ 0 ] !== void 0 ) ? diff[ 0 ] : 0
		}
		
		eventPress( ...diff : KeyboardEvent[] ) {
			let code = diff[ 0 ][ 'code' ] || diff[ 0 ].key
			let selectedRow = this.selectedRow()
			let suggestsLength = this.lister().childsVisible().length
			let isSelectedKey = code === 'Enter' || code === 'ArrowRight'
			let spaceKey = ( code === 'Space' ) ? ' ' : ''
			
			if( isSelectedKey || spaceKey ) {
				
				if( !selectedRow ) return
				
				if( spaceKey ) diff[ 0 ].preventDefault()
				
				this.value( this.suggests()[ selectedRow - 1 ] + spaceKey )
			}
			
			if( code === 'ArrowDown' ) {
				selectedRow = selectedRow === suggestsLength ? 0 : selectedRow + 1
				this.selectedRow( selectedRow )
			}
			
			if( code === 'ArrowUp' ) {
				selectedRow = selectedRow === 0 ? suggestsLength : selectedRow - 1
				this.selectedRow( selectedRow )
			}
			
		}
		
		selected( index : number ) {
			return index === ( this.selectedRow() - 1 )
		}
		
		suggest( index : number ) {
			return this.suggests()[ index ]
		}
	}
}
