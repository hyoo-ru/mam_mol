namespace $ {
	export function $mol_view_tree2_ts_locale(operator: $mol_tree2, context: $mol_view_tree2_ts_context): $mol_view_tree2_ts_method_body_type {
		const code = operator.struct('inline', [
			operator.data('this.$.$mol_locale.text( \''),
			context.locale(operator),
			operator.data('\' )'),
		])

		const result_type = operator.data('string')

		return { code, result_type }
	}
}
