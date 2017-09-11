namespace $.$$ {
	export class $mol_pop extends $.$mol_pop {
		
		sub() {
			return [
				this.Anchor() ,
				... this.showed() ? [ this.Bubble() ] : [] ,
			]
		}
		
		height_max() {
			return this.$.$mol_window.size().height * 0.33;
		}

		align() {
			const viewport = this.$.$mol_window.size()
			
			const vert = this.top() > ( viewport.height - this.bottom() ) ? 'top' : 'bottom'
			const hor = this.left() > ( viewport.width - this.right() ) ? 'left' : 'right'
			
			return `${ vert }_${ hor }`
		}
		
	}
}
