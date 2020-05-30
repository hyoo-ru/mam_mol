namespace $ {
	export class $mol_view_tree2_multiple_spread extends $mol_object2 {
		protected super_spread: $mol_tree2 | undefined = undefined

		constructor(
			$: $mol_ambient_context,
			protected prop_parts: $mol_view_tree2_prop
		) {
			super()
			this.$ = $
		}

		get(prop: $mol_tree2) {
			const spread_prop = prop.kids.length === 1 ? prop.kids[0] : undefined

			if (spread_prop) {
				const spread_prop_parts = this.$.$mol_view_tree2_prop_split(spread_prop)

				return prop.struct('inline', [
					prop.data('...this.'),
					this.$.$mol_view_tree2_function_call(spread_prop_parts),
					prop.data(','),
				])
			}

			const super_spread = this.super_spread

			if (super_spread) return this.$.$mol_fail(prop.error(
				`Only one \`^\` operator allowed, first was ${super_spread}`
			))

			this.super_spread = prop.struct('inline', [
				prop.data('...super.'),
				this.$.$mol_view_tree2_function_call(this.prop_parts),
				prop.data(','),
			])

			return this.super_spread
		}
	} 
}
