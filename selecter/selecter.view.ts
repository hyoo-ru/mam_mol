namespace $.$mol {

	export class $mol_selecter extends $.$mol_selecter {

		@ $mol_mem()
		contextSub() {
			var context = this.context()
			var subContext = Object.create( context )
			subContext.$mol_viewer_heightLimit = () => context.$mol_viewer_heightLimit() / 3
			return subContext
		}

		options() : { [ key : string ] : () => string } {
			return {}
		}
		
		optionsKeys() {
			return Object.keys( this.options() )
		}

		items() {
			return this.optionsKeys().map( key => this.optioner( key ) )
		}

		childs() {
			return [
				this.inputer() ,
				( this.expanded() && this.items().length )
					? this.lister()
					: null
			]
		}
		
		inputerChilds () {
			return [
				( this.optionsKeys().length > this.minRowsToSearch() )
				? this.stringer()
				: null,
				this.trigger()
			]
		}

		eventOptionSelect( key : string , next? : MouseEvent ) {
			this.value( this.options()[key]() );
		}
		
		optionText( key : string ) {
			return this.options()[key]();
		}
		
		expanded() {
			return $mol_viewer_selection.focused().indexOf( this.DOMNode() ) !== -1
		}

		@ $mol_mem()
		selectedRow( next? : any ) {
			return ( next !== void 0 ) ? next : 0
		}
		
		selected( key : string ) {
			return this.optionsKeys().indexOf( key ) === this.selectedRow();
		}

		eventPress( next? : KeyboardEvent ) {
			let selectedRow = this.selectedRow()
			let optionsLength = this.lister().childsVisible().length - 1
			switch(next.keyCode) {
				case $mol_keyboard_code.down :
					selectedRow = selectedRow === optionsLength ? 0 : selectedRow + 1
					this.selectedRow( selectedRow )
					break

				case $mol_keyboard_code.up :
					selectedRow = selectedRow === 0 ? optionsLength : selectedRow - 1
					this.selectedRow( selectedRow )
					break

				case $mol_keyboard_code.enter :
				case $mol_keyboard_code.right :
					if( !selectedRow ) return
					this.value( this.options()[ this.optionsKeys()[ selectedRow ]]())
					break

				case $mol_keyboard_code.space :
					if( !selectedRow ) return
					next.preventDefault()
					this.value( this.options()[ this.optionsKeys()[ selectedRow ]]())
					break
			}
		}
	}
}
