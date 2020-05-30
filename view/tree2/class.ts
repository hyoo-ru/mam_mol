namespace $ {
	export function $mol_view_tree2_class(
		this: $mol_ambient_context,
		klass: $mol_tree2,
		locales: $mol_view_tree2_locales
	) {
		if( !class_regex.test( klass.type ) ) return this.$mol_fail(
			klass.error( 'Wrong class name, use something like `$' + 'my_component`' )
		)

		const subclass = klass.kids.length === 1 ? klass.kids[0] : undefined

		if (! subclass) return this.$mol_fail(
			klass.error( 'No subclass, use `$' + 'my_component2 $' + 'mol_view`' )
		)

		if( !class_regex.test( subclass.type ) ) return this.$mol_fail(
			subclass.error( 'Wrong subclass name, use something like `$' + 'mol_view`' )
		)

		const body: $mol_tree2[] = []
		const context = new $mol_view_tree2_context(this, klass, locales, body)

		for (const having of subclass.kids) {
			if (having.type === '-') {
				body.push($mol_view_tree2_comment(having))
				continue
			}

			if (! context.has_owner(having)) {
				const index = context.index(having)
				const having_parts = this.$mol_view_tree2_prop_split(having)
				const method = this.$mol_view_tree2_value_block(having_parts, context)

				context.method(index, method)	
			}
		}

		return $mol_tree2.struct('block', [
			$mol_tree2.struct('inline', [
				klass.data('export class '),
				klass.data(klass.type),
				klass.data(' extends '),
				subclass.data(subclass.type),
				klass.data(' {'),
			]),

			$mol_tree2.struct('block', body),

			klass.data('}'),
			klass.data(''),
		])
	}

	const class_regex = /^\$\w+$/
}
