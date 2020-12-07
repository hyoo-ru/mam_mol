namespace $ {

	export function $mol_support_css_overflow_anchor( this: $ ) {
		return this.$mol_dom_context.CSS?.supports( 'overflow-anchor:auto' ) ?? false
	}

}
