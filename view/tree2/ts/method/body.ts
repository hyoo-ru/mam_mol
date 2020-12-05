namespace $ {

	const err = $mol_view_tree2_error_str

	export function $mol_view_tree2_ts_method_body(
		this: $mol_ambient_context,
		having_parts: $mol_view_tree2_prop,
		parent_context: $mol_view_tree2_ts_context
	) {
		const context = parent_context.parent(having_parts)
		const having = having_parts.src
		const operator = having.kids.length === 1 ? having.kids[0] : undefined

		if (! operator ) return this.$mol_fail(
			err`Need an child part in a class body at ${having.span}`
		)

		const type = operator.type

		const index = context.index(having_parts)

		let body: $mol_view_tree2_ts_method_body_type

		if (type === '<=') body = add_return(this.$mol_view_tree2_ts_bind_left(operator, context, having_parts))
		else if (type === '<=>') body = add_return(this.$mol_view_tree2_ts_bind_both(operator, context))
		else if (type === '@') body = add_return(this.$mol_view_tree2_ts_locale(operator, context))
		else if (type === '*') body = add_return(this.$mol_view_tree2_ts_dictionary(operator, context, having_parts))
		else if (type[0] === '/') body = add_return(this.$mol_view_tree2_ts_array(operator, context, having_parts))
		else if (type[0] === '$') body = this.$mol_view_tree2_ts_factory(operator, having_parts, context)
		else body = add_return(this.$mol_view_tree2_ts_value(operator))

		const method = this.$mol_view_tree2_ts_method(having_parts, body, parent_context.klass().name)

		context.method(index, method)
	}

	function add_return(value: $mol_view_tree2_ts_method_body_type): $mol_view_tree2_ts_method_body_type {
		return {
			result_type: value.result_type,
			code: $mol_tree2.struct('block', [
				$mol_tree2.struct('inline', [
					value.code.data('return '),
					value.code
				])
			])
		}
	}
}

/*
tree
$my $sup
    Opened $mol_check_box
        checked?val <=> opened?val false

d.ts
declare class $my extends $sup {
    Opened() : $mol_check_box
    opened() : boolean
}

type qazsxedc = $mol_type_assert( $mol_check_box['checked'] , $my['opened'] )
*/
