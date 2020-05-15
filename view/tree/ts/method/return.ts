namespace $ {
	export function $mol_view_tree_ts_method_return(method_body: $mol_tree) {
		return method_body.make({ type: 'line', sub: [
			method_body.make({ data: 'return' }),
			method_body
		] })
	}
}
