namespace $ {

	let cache = null as null | boolean
	export function $mol_support_css_overflow_anchor( this: $ ) {
		return cache ?? (
			cache = this.$mol_dom_context.CSS?.supports( 'overflow-anchor:auto' ) ?? false
		)
	}

}
