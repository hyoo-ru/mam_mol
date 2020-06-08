namespace $ {

	const err = $mol_view_tree2_error_str

	export function $mol_view_tree2_class(
		this: $mol_ambient_context,
		klass: $mol_tree2,
		locales: $mol_view_tree2_locales
	) {
		if( !class_regex.test( klass.type ) ) return this.$mol_fail(
			err `Wrong class name at ${klass.span}, use ${example}` 
		)

		const subclass = klass.kids.length === 1 ? klass.kids[0] : undefined

		if (! subclass) return this.$mol_fail(
			err`No subclass at ${klass.span}, use ${example}`
		)

		if( !class_regex.test( subclass.type ) ) return this.$mol_fail(
			err`Wrong subclass name at ${subclass.span}, use ${example}`
		)

		const body: $mol_tree2[] = []
		const class_parts = this.$mol_view_tree2_prop_split(klass)
		const context = new $mol_view_tree2_context(this, [ class_parts ], locales, body)

		for (const having of subclass.kids) {
			if (having.type === '-') {
				body.push(this.$mol_view_tree2_comment(having))
				continue
			}

			const having_parts = this.$mol_view_tree2_prop_split(having)
			if (context.get_method(having_parts)) continue

			this.$mol_view_tree2_method_body(having_parts, context)
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

	const example = new $mol_view_tree2_error_suggestions([
		'$' + 'my_component $' + 'mol_view'
	])

	const class_regex = /^\$\w+$/
}
