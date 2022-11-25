namespace $ {

	let cache = null as null | boolean
	export function $mol_support_css_overflow_anchor( this: $ ) {
		return cache ?? (
			cache = (
				!/Gecko\//.test( navigator.userAgent ) // FF doesn't anchow while scroll animates
				&& this.$mol_dom_context.CSS?.supports( 'overflow-anchor:auto' )
			) ?? false
		)
	}

}
