namespace $ {
	const err = $mol_view_tree2_error_str

	/*
	 * ```tree
	 * Factory_name $class2
	 * 	having!key?next => owner!key?next
	 * ```
	 */
	export function $mol_view_tree2_ts_bind_right(
		this: $mol_ambient_context,
		operator: $mol_tree2,
		having_parts: $mol_view_tree2_prop,
		factory: $mol_view_tree2_prop,
		context: $mol_view_tree2_context,
	) {
		const { owner_parts } = this.$mol_view_tree2_bind_right_parts(operator, having_parts, factory)

		const prev = context.get_method(owner_parts)

		if (prev) return this.$mol_fail(
			err`Method ${owner_parts.name.value} at ${owner_parts.name.span} already defined at ${prev.src.span}, ${example}`
		)

		const index = context.index(owner_parts)

		const body = $mol_tree2.struct('block', [
			$mol_tree2.struct('inline', [
				owner_parts.name.data('return this.'),
				this.$mol_view_tree2_ts_function_call(factory),
				owner_parts.name.data('.'),
				this.$mol_view_tree2_ts_function_call(having_parts),
			])
		])

		const method = $mol_tree2.struct('lines', [
			this.$mol_view_tree2_ts_comment_doc(owner_parts.src),
			$mol_tree2.struct('inline', [
				owner_parts.name,
				$mol_view_tree2_ts_function_declaration(owner_parts, context.types),
				owner_parts.name.data(' {'),
			]),
			body,
			owner_parts.name.data('}'),
		])

		context.method(index, method)
	}

	const example = new $mol_view_tree2_error_suggestions([
		'having => owner',
		'having?next => owner?next',
		'having!key => owner!key',
		'having!key?next => owner!key?next'
	])
}
