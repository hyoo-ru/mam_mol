namespace $ {
	const err = $mol_view_tree2_error_str

	/**
	 * ```tree
	 * ^ name
	 * ```
	 */
	export function $mol_view_tree2_spread(this: $mol_ambient_context, operator: $mol_tree2) {
		const spread_prop = operator.kids.length === 1 ? operator.kids[0] : undefined

		if (! spread_prop) return this.$mol_fail(
			err`Need a method name at ${operator.span}, use ${example}`
		)

		const spread_prop_parts = this.$mol_view_tree2_prop_split(spread_prop)

		return $mol_tree2.struct('inline', [
			spread_prop.data('...this.'),
			this.$.$mol_view_tree2_function_call(spread_prop_parts)
		])
	}

	export class $mol_view_tree2_spread_factory extends $mol_object2 {
		protected super_spread: $mol_tree2 | undefined = undefined

		constructor(
			$: $mol_ambient_context,
			protected prop_parts?: $mol_view_tree2_prop
		) {
			super()
			this.$ = $
		}

		create(prop: $mol_tree2) {
			const spread_prop = prop.kids.length === 1 ? prop.kids[0] : undefined

			if (spread_prop) return this.$.$mol_view_tree2_spread(spread_prop)

			const super_spread = this.super_spread

			if (super_spread) return this.$.$mol_fail(
				err`Only one \`^\` operator allowed at ${prop.span}, first was at ${super_spread.span}`
			)

			if (! this.prop_parts) return this.$.$mol_fail(
				err`Operator \`^\` not allowed at ${prop.span}`
			)

			this.super_spread = $mol_tree2.struct('inline', [
				prop.data('...super.'),
				this.$.$mol_view_tree2_function_call(this.prop_parts)
			])

			return this.super_spread
		}
	}

	const example = new $mol_view_tree2_error_suggestions([
		'^ name'
	])
}
