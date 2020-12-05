namespace $ {
	export type $mol_view_tree2_ts_method_body_type = {
		code: $mol_tree2
		result_type: $mol_tree2;
	}

	export function $mol_view_tree2_ts_method(
		this: $mol_ambient_context,
		owner_parts: $mol_view_tree2_prop,
		body: $mol_view_tree2_ts_method_body_type,
		klass_name: $mol_tree2,
	) {
		const { name, key, next, src } = owner_parts
		const operator = src.kids.length === 1 ? src.kids[0] : undefined
		const type = operator?.type
		const is_class = type && type[0] === '$'
		const is_delegate = type === '<=' || type === '<=>'

		let need_cache = false
		if (is_delegate) need_cache = false
		else if (next !== undefined) need_cache = true
		else if (is_class) need_cache = true

		const sub: $mol_tree2[] = [
			this.$mol_view_tree2_ts_comment_doc(src),
		]

		const decorators = need_cache
			? name.struct('inline', [
				name.data('__decorate([ '),
				name.data(key ? '$mol_mem_key' : '$mol_mem'),
				name.data('], '),
				klass_name,
				name.data('.prototype, '),
				name.data(JSON.stringify(name.value)),
				name.data(', null)')
			])
			: undefined

		sub.push(
			name.struct('inline', [
				name,
				$mol_view_tree2_ts_function_declaration(owner_parts),
				name.data(' {'),
			])
		)

		if (next && need_cache) sub.push(
			next.struct('block', [
				next.struct('inline', [
					next.data('if ( '),
					next,
					next.data(' !== undefined ) return '),
					next,
				])
			])
		)

		sub.push(body.code, name.data('}'))

		const body_dts = $mol_view_tree2_ts_function_type(owner_parts, body.result_type)

		return { body: name.struct('lines', sub), decorators, body_dts }
	}

	export type $mol_view_tree2_ts_method_type = Partial<ReturnType<typeof $mol_view_tree2_ts_method>> & { body: $mol_tree2 }
}
