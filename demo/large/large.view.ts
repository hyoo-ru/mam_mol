namespace $.$$ {
	export class $mol_demo_large extends $.$mol_demo_large {
		
		@ $mol_mem
		context_sub() {
			const context = this.context()
			const subContext : typeof context = Object.create( context )
			
			subContext.$mol_view_visible_height = () => this.minimal_height()
			subContext.$mol_view_visible_width = () => this.minimal_width()
			
			return subContext
		}

		minimal_height() {
			return $mol_window.size().height * .75
		}
		
		minimal_width() {
			return this.$.$mol_window.size().width
		}
		
	}
}
