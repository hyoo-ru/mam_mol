namespace $.$mol {
	export class $mol_meter extends $.$mol_meter {
		
		_request_id = 0;
		
		constructor() {
			super()
			this.defer_task()
		}
		
		defer_task( next?: $mol_defer, force?: $mol_atom_force ) {
			this._request_id = requestAnimationFrame( () => {
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
		
		destroyed( next?: boolean ) {
			if( next ) cancelAnimationFrame( this._request_id )
			return super.destroyed( next )
		}
		
	}
}
