namespace $.$mol {
	export class $mol_meter extends $.$mol_meter {
		
		_request_id = 0
		
		dom_node( node?: Element ) {
			if( node === void 0 ) {
				const cache_node = this[ 'dom_node()' ]
				if( cache_node ) return cache_node
			} 
			
			const _node = super.dom_node( node )
			
			if( _node.tagName === 'BODY' ) return _node
			
			new $mol_defer( ()=> this.update() )
			
			return _node
		}
		
		defer_task() {
			this._request_id = requestAnimationFrame( ()=> this.update() )
		}
	
		update() {
			const elem = this.dom_node() as HTMLElement
			const rect = elem.getBoundingClientRect()
			
			this.width( rect.width )
			this.height( rect.height )
			this.top( rect.top )
			this.bottom( rect.bottom )
			this.left( rect.left )
			this.right( rect.right )
			
			this.defer_task()
		}
		
		destroyed( next?: boolean ) {
			if( next ) cancelAnimationFrame( this._request_id )
			return super.destroyed( next )
		}
		
		@ $mol_mem()
		width( val? : any ) {
			if( val !== void 0 ) return val
			else return $mol_window.size().width
		}
		
		@ $mol_mem()
		height( val? : any ) {
			if( val !== void 0 ) return val
			else return $mol_window.size().height
		}
		
	}
}
