namespace $ {
	export class $mol_view_tree_ts_spread {
		protected super_spread: $mol_tree | undefined = undefined

		constructor(protected prop_parts: $mol_view_tree_ts_prop) {}

		get(prop: $mol_tree) {
			const super_spread = this.super_spread
			if (super_spread) throw prop.error(
				`Only one \`^\` operator allowed, first was ${super_spread} at ${super_spread.row}:${super_spread.col}`
			)

			this.super_spread = prop.make_struct('inline', [
				prop.make_data('...super.'),
				$mol_view_tree_ts_function_call(this.prop_parts),
				prop.make_data(' ,'),
			])

			return this.super_spread
		}
	} 
}
