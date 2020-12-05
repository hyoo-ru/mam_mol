namespace $ {
	const err = $mol_view_tree2_error_str

	export class $mol_view_tree2_ts_spread_factory extends $mol_object2 {
		protected super_spread: $mol_view_tree2_ts_method_body_type | undefined = undefined

		constructor(
			$: $mol_ambient_context,
			protected klass: $mol_tree2,
			protected prop_parts?: $mol_view_tree2_prop,
		) {
			super()
			this.$ = $
		}

		/**
		 * ```tree
		 * ^ name
		 * ```
		 */
		create(prop: $mol_tree2) {
			const spread_prop = prop.kids.length === 1 ? prop.kids[0] : undefined

			if (spread_prop) {
				const spread_prop_parts = this.$.$mol_view_tree2_prop_split(spread_prop)

				const code = $mol_tree2.struct('inline', [
					spread_prop.data('...this.'),
					this.$.$mol_view_tree2_ts_function_call(spread_prop_parts)
				])
		
				const result_type = $mol_tree2.struct('inline', [
					spread_prop_parts.name.data('ReturnType<'),
					this.klass.data(this.klass.type),
					spread_prop_parts.name.data('[\''),
					spread_prop_parts.name,
					spread_prop_parts.name.data('\']>'),
				])

				return { code, result_type }
			}

			const super_spread = this.super_spread

			if (super_spread) return this.$.$mol_fail(
				err`Only one \`^\` operator allowed at ${prop.span}, first was at ${super_spread.code.span}`
			)

			const prop_parts = this.prop_parts

			if (! prop_parts) return this.$.$mol_fail(
				err`Operator \`^\` not allowed at ${prop.span}`
			)

			const code = $mol_tree2.struct('inline', [
				prop.data('...super.'),
				this.$.$mol_view_tree2_ts_function_call(prop_parts)
			])

			const superclass = this.$.$mol_view_tree2_class_super(this.klass)
			const result_type = $mol_tree2.struct('inline', [
				prop_parts.name.data('ReturnType<'),
				superclass.data(superclass.type),
				prop_parts.name.data('[\''),
				prop_parts.name,
				prop_parts.name.data('\']>'),
			])

			this.super_spread = { code, result_type }

			return this.super_spread
		}
	}
}
