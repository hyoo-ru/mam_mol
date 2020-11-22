namespace $ {

	export function $mol_support_css_overflow_anchor( this: $mol_ambient_context ) {
		return this.$mol_dom_context.CSS?.supports( 'overflow-anchor:auto' ) ?? false
	}

}
