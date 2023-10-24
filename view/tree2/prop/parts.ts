namespace $ {
	export function $mol_view_tree2_prop_parts( prop: string ) {
		const groups = [ ...prop.matchAll( $mol_view_tree2_prop_signature ) ][0]?.groups
		if (! groups) throw new Error(`${$mol_view_tree2_prop_signature} not matched: ${prop}`)

		return {
			name: groups.name,
			key: groups.key ? '*' : '',
			next: groups.next ? '?' : ''
		}
	}
}
