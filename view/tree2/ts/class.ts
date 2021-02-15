namespace $ {
	export function $mol_view_tree2_ts_class(
		this: $,
		klass: $mol_tree2,
		locales: $mol_view_tree2_locales
	) {
		const superclass = this.$mol_view_tree2_class_super(klass)
		const body: $mol_tree2[] = []
		const class_parts = this.$mol_view_tree2_prop_split(klass)
		const context = new $mol_view_tree2_context(this, [ class_parts ], locales, body)
		const props = this.$mol_view_tree2_class_props(klass)

		for (const having of props) {

			const having_parts = this.$mol_view_tree2_prop_split(having)
			if (context.get_method(having_parts)) continue

			this.$mol_view_tree2_ts_method_body(having_parts, context)
		}

		return klass.struct('indent', [
			klass.struct('line', [
				klass.data('export class '),
				klass.data(klass.type),
				klass.data(' extends '),
				superclass.data(superclass.type),
				klass.data(' {'),
			]),

			klass.struct('indent', body),

			klass.data('}'),
			klass.data(''),
		])
	}
}
