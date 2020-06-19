namespace $ {
	export function $mol_view_tree2_classes( defs : $mol_tree2 ) {
		return defs.clone(defs.hack({
			'-': () => [],
			'': node => [ node ]
		}))
	}

	export function $mol_view_tree2_super_name(this: $mol_ambient_context, val : $mol_tree2 ) {
		return this.$mol_view_tree2_child(val).type
	}
}
