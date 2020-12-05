namespace $ {
	export function $mol_view_tree2_ts_class(
		this: $mol_ambient_context,
		klass: $mol_tree2,
		locales: $mol_view_tree2_locales
	) {
		const superclass = this.$mol_view_tree2_class_super(klass)

		const body: $mol_view_tree2_ts_method_type[] = []

		const class_parts = this.$mol_view_tree2_prop_split(klass)
		const context = new $mol_view_tree2_ts_context(this, [ class_parts ], locales, body)
		const props = this.$mol_view_tree2_class_props(klass)

		for (const having of props.kids) {
			if (having.type === '-') {
				body.push({ body: this.$mol_view_tree2_ts_comment(having) })
				continue
			}

			const having_parts = this.$mol_view_tree2_prop_split(having)

			if (context.get_method_owner(having_parts)) continue

			this.$mol_view_tree2_ts_method_body(having_parts, context)
		}

		const class_begin = $mol_tree2.struct('inline', [
			klass.data('export class '),
			klass.data(klass.type),
			klass.data(' extends '),
			superclass.data(superclass.type),
			klass.data(' {'),
		])

		const js = $mol_tree2.struct('block', [
			class_begin,
			$mol_tree2.struct('block', body.map(method => method.body)),

			klass.data('}'),
			$mol_tree2.struct('lines', body.map(method => method.decorators).filter($mol_guard_defined)),
			klass.data(''),
		])

		const dts = $mol_tree2.struct('block', [
			class_begin,
			$mol_tree2.struct('block', body.map(method => method.body_dts).filter($mol_guard_defined)),

			klass.data('}'),
			// $mol_tree2.struct('lines', body.map(method => method.assertions_dts).filter($mol_guard_defined)),
			klass.data(''),
		])

		return { js, dts }
	}
}
