namespace $.$mol {
	export class $mol_meter extends $.$mol_meter {
		
		_request_id = 0
		
		render() {
			const node = super.render()

			if( node.tagName !== 'BODY' ) {
				this._request_id = requestAnimationFrame( ()=> this.update() )
			}

			return node
		}
		
		defer_task() {
			this._request_id = requestAnimationFrame( ()=> this.update() )
		}
	
		update() {
			const elem = this.render()
			const rect = elem.getBoundingClientRect()

			this.width( Math.round( rect.width ) )
			this.height( Math.round( rect.height ) )
			this.top( rect.top )
			this.bottom( rect.bottom )
			this.left( rect.left )
			this.right( rect.right )
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
