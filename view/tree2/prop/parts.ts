namespace $ {
	export function $mol_view_tree2_prop_parts(this: $, prop: $mol_tree2 ) {
		const groups = [ ...prop.type.matchAll( $mol_view_tree2_prop_signature ) ][0]?.groups
		if (! groups) {
			this.$mol_fail(
				$mol_view_tree2_error_str`Required prop like some*? at ${prop.span}`
			)
		}

		return {
			name: groups.name,
			key: groups.key ? '*' : '',
			next: groups.next ? '?' : ''
		}
	}
}
