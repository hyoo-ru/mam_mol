namespace $.$mol {
	export class $mol_meter extends $.$mol_meter {
		
		_request_id = 0
		
		defer_task() {
			this._request_id = requestAnimationFrame( ()=> this.update() )
		}
		
		dom_node() {
			return ( this.object_owner() as $mol_view ).dom_node()
		}
		
		update() {
			const elem = this.render()
			const rect = elem.getBoundingClientRect()

			this.width( Math.round( rect.width ) )
			this.height( Math.round( rect.height ) )
			this.top( Math.round( rect.top ) )
			this.bottom( Math.round( rect.bottom ) )
			this.left( Math.round( rect.left ) )
			this.right( Math.round( rect.right ) )
			
			this.defer_task()
		}

		destroyed( next?: boolean ) {
			if( next ) cancelAnimationFrame( this._request_id )
			return super.destroyed( next )
		}
		
		@ $mol_mem()
		width( val? : any ) {
			if( val !== void 0 ) return val
			if( this.render().tagName === 'BODY' ) return $mol_window.size().width
			
			new $mol_defer( ()=> this.update() )
			return 0
			//throw new $mol_atom_wait( 'Wait for render...' )
		}
		
		@ $mol_mem()
		height( val? : any ) {
			if( val !== void 0 ) return val
			if( this.render().tagName === 'BODY' ) return $mol_window.size().height
			
			new $mol_defer( ()=> this.update() )
			return 0
			//throw new $mol_atom_wait( 'Wait for render...' )
		}
		
	}
}
