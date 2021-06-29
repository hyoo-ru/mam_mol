namespace $ {
	
	export function $mol_view_tree2_normalize( this: $, defs : $mol_tree2 ) {
		return defs.clone(
			$mol_view_tree2_classes( defs ).kids.map( cl => cl.clone([
				this.$mol_view_tree2_class_super( cl ).clone(
					this.$mol_view_tree2_class_props( cl )
				)
			]) )
		)
	}
	
}
