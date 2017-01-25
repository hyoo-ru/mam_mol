namespace $.$mol {
	export class $mol_nav extends $.$mol_nav {
		event_key(event?: KeyboardEvent) {
			switch(event.keyCode) {
				case $mol_keyboard_code.up :
					this.event_up(event)
					break
				case $mol_keyboard_code.down :
					this.event_down(event)
					break
				case $mol_keyboard_code.left :
					this.event_left(event)
					break
				case $mol_keyboard_code.right :
					this.event_right(event)
					break
			}
		}
		event_up(event?: KeyboardEvent) {
			if(this.index_y() === 0) {
				this.current_y(this.keys_y()[this.max_index_y()])
			} else {
				this.current_y(this.keys_y()[this.index_y() - 1])
			}
		}
		event_down(event?: KeyboardEvent) {
			if(this.index_y() >= this.max_index_y()) {
				this.current_y(this.keys_y()[0])
			} else {
				this.current_y(this.keys_y()[this.index_y() + 1])
			}
		}
		event_left(event?: KeyboardEvent) {
			if(this.index_x() <= 0) {
				this.current_x(this.keys_x()[this.max_index_x()])
			} else {
				this.current_x(this.keys_x()[this.index_x() - 1]) 
			}
		}
		event_right(event?: KeyboardEvent) {
			if(this.index_x() >= this.max_index_x()) {
				this.current_x(this.keys_x()[0])
			} else {
				this.current_x(this.keys_x()[this.index_x() + 1])
			}
		}
		index_y() {
			let index = this.keys_y().indexOf(this.current_y)
			if(index < 0)
				this.current_y(this.keys_y()[0])
			return index
		}
		index_x() {
			let index = this.keys_x().indexOf(this.current_x)
			if(index < 0)
				this.current_x(this.keys_x()[0])
			return index
		}
		max_index_y() {
			return this.keys_y().length - 1;
		}
		max_index_x() {
			return this.keys_x().length - 1;
		}
	}
}
