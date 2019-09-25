namespace $ {

	export class $mol_dom_visible extends $mol_object {

		@ $mol_mem
		static observer() {
			return new IntersectionObserver( ( events ) => {
				for( const event of events ) {
					this.element( event.target , event.isIntersecting )
				}
			} )
		}

		@ $mol_mem_key
		static element( element : Element , next? : boolean ) {
			this.$.$mol_dom_visible.observer().observe( element )
			return ( next === undefined ) ? true : next
		}

	}

}

