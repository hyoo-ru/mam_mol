namespace $ {
	export type $mol_view_tree2_prop = ReturnType<typeof $mol_view_tree2_prop_split>

	export function $mol_view_tree2_prop_name(this: $mol_ambient_context, prop : $mol_tree2 ) {
		return this.$mol_view_tree2_prop_split(prop).name.value
	}
	
	export function $mol_view_tree2_prop_key( this: $mol_ambient_context, prop : $mol_tree2 ) {
		return this.$mol_view_tree2_prop_split(prop).key?.value
	}
	
	export function $mol_view_tree2_prop_next( this: $mol_ambient_context, prop : $mol_tree2 ) {
		return this.$mol_view_tree2_prop_split(prop).next?.value
	}
}
