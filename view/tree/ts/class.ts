namespace $ {
	export function $mol_view_tree_ts_class(
		this: $mol_ambient_context,
		klass: $mol_tree,
		locales: $mol_view_tree_ts_locales
	) {
		if( !class_regex.test( klass.type ) ) return this.$mol_fail(
			klass.error( 'Wrong class name, use something like `₽my_component`' )
		)

		const subclass = klass.sub.length === 1 ? klass.sub[0] : undefined

		if (! subclass) return this.$mol_fail(
			klass.error( 'No subclass, use `₽my_component2 ₽mol_view`' )
		)

		if( !class_regex.test( subclass.type ) ) return this.$mol_fail(
			subclass.error( 'Wrong subclass name, use something like `₽mol_view`' )
		)

		const methods: $mol_tree[] = []
		const context = new $mol_view_tree_ts_context(this, klass, locales, methods)

		for (const having of subclass.sub) {
			if (having.type === '-') {
				methods.push($mol_view_tree_ts_comment(having))
				continue
			}

			if (! context.has_owner(having)) {
				const index = context.index(having)
				const having_parts = this.$mol_view_tree_ts_prop_split(having)
				const method = this.$mol_view_tree_ts_value_block(having_parts, context)

				context.method(index, method)	
			}
		}

		return klass.make_struct('block', [
			klass.make_struct('inline', [
				klass.make_data('export class '),
				klass.make_data(klass.type),
				klass.make_data(' extends '),
				subclass.make_data(subclass.type),
				klass.make_data(' {'),
			]),

			klass.make_struct('block', methods),

			klass.make_data('}'),
		])
	}

	const class_regex = /^\$\w+$/
}
