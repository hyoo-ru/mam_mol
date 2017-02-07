namespace $.$mol {
	export class $mol_meter extends $.$mol_meter {
		
		constructor() {
			super()
			this.defer_task()
		}
		
		@$mol_mem()
		defer_task( next?: $mol_defer, force?: $mol_atom_force ) {
			return requestAnimationFrame( () => {
				const elem = this.dom_node() as HTMLElement
				const rect = elem.getBoundingClientRect()
				
				this.width( rect.width )
				this.height( rect.height )
				this.top( rect.top )
				this.bottom( rect.bottom )
				this.left( rect.left )
				this.right( rect.right )
				
				this.defer_task( void 0, $mol_atom_force )
			} )
		}
		
	}
}
