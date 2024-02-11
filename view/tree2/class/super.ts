namespace $ {
	const err = $mol_view_tree2_error_str

	export function $mol_view_tree2_class_super(
		this: $,
		klass: $mol_tree2
	) {
		if( ! $mol_view_tree2_class_match( klass ) ) return this.$mol_fail(
			err `Wrong class name at ${klass.span}` 
		)

		const superclass = klass.kids.length === 1 ? klass.kids[0] : undefined

		if (! superclass) return this.$mol_fail(
			err`No super class at ${klass.span}`
		)

		if( ! $mol_view_tree2_class_match( superclass ) ) return this.$mol_fail(
			err`Wrong super class name ${JSON.stringify(superclass.type).replace(/(^"|"$)/g, "")} at ${superclass.span}`
		)

		return superclass
	}
}
