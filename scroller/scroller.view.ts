module $.$mol {
	export class $mol_scroller extends $.$mol_scroller {

		scrollTop( ...diff : number[] ) {
			return $mol_state_session.value( this.objectPath() + '.scrollTop()' , ...diff ) || 0
		}

		scrollLeft( ...diff : number[] ) {
			return $mol_state_session.value( this.objectPath() + '.scrollLeft()' , ...diff ) || 0
		}

		eventScroll( ...diff : Event[] ) {
			new $mol_defer( ()=> {
				var el = this.DOMNode()
				this.scrollTop( el.scrollTop )
				this.scrollLeft( el.scrollLeft )
			} )
		}

		@ $mol_prop()
		contextSub( ) {
			var context = this.context()
			var subContext = Object.create( context )
			subContext.$mol_viewer_heightLimit = ()=> context.$mol_viewer_heightLimit() + this.scrollTop()
			return subContext
		}
		
	}
}
