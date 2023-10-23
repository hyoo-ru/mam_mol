namespace $ {
	export function $mol_view_tree2_prop_parts( prop: $mol_tree2 ) {
		return [ ...prop.type.matchAll( $mol_view_tree2_prop_signature ) ][0].groups!
	}
}
