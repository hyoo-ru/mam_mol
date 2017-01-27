namespace $.$mol {
	export class $mol_demo_small extends $.$mol_demo_small {
		
		@ $mol_mem()
		context_sub( ) {
			const context = this.context()
			const subContext : $mol_view_context = Object.create( context )
			subContext.$mol_view_visible_height = () => this.height()
			subContext.$mol_view_visible_width = () => this.width()
			return subContext
		}
		
	}
}
