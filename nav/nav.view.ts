namespace $.$mol {
	export class $mol_nav extends $.$mol_nav {
		event_key( event?: KeyboardEvent ) {
			switch( event.keyCode ) {
				case $mol_keyboard_code.up :
					return this.event_up( event )
				case $mol_keyboard_code.down :
					return this.event_down( event )
				case $mol_keyboard_code.left :
					return this.event_left( event )
				case $mol_keyboard_code.right :
					return this.event_right( event )
			}
		}
		
		event_up( event?: KeyboardEvent ) {
			event.preventDefault();
			const keys = this.keys_y()
			const index_y = this.index_y();
			const index_old = index_y === null ? 0 : index_y
			const index = ( index_old + keys.length - 1 ) % keys.length
			this.current_y( this.keys_y()[ index ] )
		}
		
		event_down( event?: KeyboardEvent ) {
			event.preventDefault();
			const keys = this.keys_y()
			const index_y = this.index_y();
			const index_old = index_y === null ? keys.length - 1: index_y;
			const index = ( index_old + 1 ) % keys.length
			this.current_y( this.keys_y()[ index ] )
		}
		
		event_left( event?: KeyboardEvent ) {
			event.preventDefault();
			const keys = this.keys_x()
			const index_x = this.index_x();
			const index_old = index_x === null ? 0 : index_x
			const index = ( index_old + keys.length - 1 ) % keys.length
			this.current_x( this.keys_x()[ index ] )
		}
		
		event_right( event?: KeyboardEvent ) {
			event.preventDefault();
			const keys = this.keys_x()
			const index_x = this.index_x();
			const index_old = index_x === null ? keys.length - 1: index_x;
			const index = ( index_old + 1 ) % keys.length
			this.current_x( this.keys_x()[ index ] )
		}
		
		index_y() {
			let index = this.keys_y().indexOf(this.current_y())
			if(index < 0) return null
			return index
		}
		
		index_x() {
			let index = this.keys_x().indexOf(this.current_x())
			if(index < 0) return null
			return index
		}
	}
}
