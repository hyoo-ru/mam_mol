namespace $ {
	export function $mol_view_tree2_ts_locale(operator: $mol_tree2, context: $mol_view_tree2_context) {
		return operator.struct('inline', [
			operator.data('this.$.$mol_locale.text( \''),
			context.locale(operator),
			operator.data('\' )'),
		])
	}
}
