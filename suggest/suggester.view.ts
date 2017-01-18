namespace $.$mol {

	export class $mol_suggest extends $.$mol_suggest {

		@ $mol_mem()
		context_sub() {
			var context = this.context()
			var subContext = Object.create( context )
			subContext.$mol_view_visible_height = ()=> context.$mol_view_visible_height() / 3
			return subContext
		}

		suggestrows() {
			return this.suggests().map( ( suggest , index )=> this.rower( index ) )
		}

		sub() {
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
			let suggestsLength = this.lister().sub_visible().length

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
			return $mol_view_selection.focused().indexOf( this.dom_node() ) !== -1
		}

		selected( index : number ) {
			return index === ( this.selectedRow() - 1 )
		}

		suggest( index : number ) {
			return this.suggests()[ index ]
		}
	}
}
