module $.$mol {
	
	export class $mol_suggester extends $.$mol_suggester {
		
		@ $mol_mem()
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
		
		eventRowerSelected( index : number , next? : MouseEvent ) {
			this.value( this.suggests()[ index ] );
		}
		
		@ $mol_mem()
		selectedRow( next? : any , prev? : any ) {
			this.value()
			return ( next !== void 0 ) ? next : 0
		}
		
		eventPress( next? : KeyboardEvent ) {
			let code = ( next[ 'code' ] || next.key ).replace( /^Arrow|bar$/ , '' )
			let selectedRow = this.selectedRow()
			let suggestsLength = this.lister().childsVisible().length
			let isSelectedKey = code === 'Enter' || code === 'Right'
			let spaceKey = ( code === 'Space' ) ? ' ' : ''
			
			if( isSelectedKey || spaceKey ) {
				
				if( !selectedRow ) return
				
				if( spaceKey ) next.preventDefault()
				
				this.value( this.suggests()[ selectedRow - 1 ] + spaceKey )
			}
			
			if( code === 'Down' ) {
				selectedRow = selectedRow === suggestsLength ? 0 : selectedRow + 1
				this.selectedRow( selectedRow )
			}
			
			if( code === 'Up' ) {
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
