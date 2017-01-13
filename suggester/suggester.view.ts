namespace $.$mol {

	export class $mol_suggester extends $.$mol_suggester {

		@ $mol_mem()
		contextSub() {
			var context = this.context()
			var subContext = Object.create( context )
			subContext.$mol_viewer_visibleHeight = ()=> context.$mol_viewer_visibleHeight() / 3
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
		selectedRow( next? : any ) {
			this.value()
			return ( next !== void 0 ) ? next : 0
		}

		eventPress( next? : KeyboardEvent ) {
			let selectedRow = this.selectedRow()
			let suggestsLength = this.lister().childsVisible().length

			switch(next.keyCode) {
				case $mol_keyboard_code.down :
					selectedRow = selectedRow === suggestsLength ? 0 : selectedRow + 1
					this.selectedRow( selectedRow )
					break

				case $mol_keyboard_code.up :
					selectedRow = selectedRow === 0 ? suggestsLength : selectedRow - 1
					this.selectedRow( selectedRow )
					break

				case $mol_keyboard_code.enter :
				case $mol_keyboard_code.right :
					if( !selectedRow ) return
					this.value( this.suggests()[ selectedRow - 1 ] )
					break

				case $mol_keyboard_code.space :
					if( !selectedRow ) return
					next.preventDefault()
					this.value( this.suggests()[ selectedRow - 1 ] + ' ' )
					break
			}
		}

		focused() {
			return $mol_viewer_selection.focused().indexOf( this.DOMNode() ) !== -1
		}

		selected( index : number ) {
			return index === ( this.selectedRow() - 1 )
		}

		suggest( index : number ) {
			return this.suggests()[ index ]
		}
	}
}
