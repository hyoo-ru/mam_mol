namespace $.$$ {

	export class $mol_paragraph extends $.$mol_paragraph {

		@ $mol_mem
		content_width() {

			let width = 0
			const letter = this.letter_width()
			
			for( const kid of this.sub() ) {
				
				if( !kid ) continue
				
				if( kid instanceof $mol_view ) {
					width += kid.minimal_width()
				} else if( typeof kid !== 'object' ) {
					width += String( kid ).length * letter
				}

			}
			
			return width
			
		}

		@ $mol_mem
		minimal_width() {
			return Math.min( this.$.$mol_window.size().width , this.content_width() )
		}

		@ $mol_mem
		minimal_height() {
			return Math.ceil( this.content_width() / this.minimal_width() ) * this.line_height()
		}

	}

}
