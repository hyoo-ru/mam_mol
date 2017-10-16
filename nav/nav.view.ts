namespace $.$$ {
	export class $mol_nav extends $.$mol_nav {
		
		event_key( event? : KeyboardEvent ) {
			if( event.defaultPrevented ) return
			
			if( this.mod_ctrl() && !event.ctrlKey ) return
			if( this.mod_shift() && !event.shiftKey ) return
			if( this.mod_alt() && !event.altKey ) return
			
			switch( event.keyCode ) {
				case $mol_keyboard_code.up : return this.event_up( event )
				case $mol_keyboard_code.down : return this.event_down( event )
				case $mol_keyboard_code.left : return this.event_left( event )
				case $mol_keyboard_code.right : return this.event_right( event )
			}
		}
		
		event_up( event? : KeyboardEvent ) {
			const keys = this.keys_y()
			if( keys.length < 2 ) return
			
			const index_y = this.index_y();
			
			const index_old = index_y === null ? 0 : index_y
			const index_new = ( index_old + keys.length - 1 ) % keys.length
			
			event.preventDefault()
			
			if( index_old === 0 && !this.cycle() ) return
			
			this.current_y( this.keys_y()[ index_new ] )
		}
		
		event_down( event? : KeyboardEvent ) {
			const keys = this.keys_y()
			if( keys.length < 2 ) return
			
			const index_y = this.index_y();
			
			const index_old = index_y === null ? keys.length - 1 : index_y;
			const index_new = ( index_old + 1 ) % keys.length
			
			event.preventDefault()
			
			if( index_new === 0 && !this.cycle() ) return
			
			this.current_y( this.keys_y()[ index_new ] )
		}
		
		event_left( event? : KeyboardEvent ) {
			const keys = this.keys_x()
			if( keys.length < 2 ) return
			
			const index_x = this.index_x();
			
			const index_old = index_x === null ? 0 : index_x
			const index_new = ( index_old + keys.length - 1 ) % keys.length
			
			event.preventDefault()
			
			if( index_old === 0 && !this.cycle() ) return
			
			this.current_x( this.keys_x()[ index_new ] )
		}
		
		event_right( event? : KeyboardEvent ) {
			const keys = this.keys_x()
			if( keys.length < 2 ) return
			
			const index_x = this.index_x();
			
			const index_old = index_x === null ? keys.length - 1 : index_x
			const index_new = ( index_old + 1 ) % keys.length
			
			event.preventDefault()
			
			if( index_new === 0 && !this.cycle() ) return
			
			this.current_x( this.keys_x()[ index_new ] )
		}
		
		index_y() {
			let index = this.keys_y().indexOf( this.current_y() )
			if( index < 0 ) return null
			
			return index
		}
		
		index_x() {
			let index = this.keys_x().indexOf( this.current_x() )
			if( index < 0 ) return null
			
			return index
		}
		
	}
}
