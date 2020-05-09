namespace $ {
	export function $mol_view_tree_ts_class_node(cn: $mol_tree) {
		if( !/^\$\w+$/.test( cn.type ) ) throw cn.error( 'Wrong component name' )
		if (cn.sub.length === 0) throw cn.error('Need an $mol_view subclass')
		const flatten_class = $mol_view_tree_flatten_props(cn)
		const body = flatten_class.sub[0]

		return cn.make({
			type: 'block',
			sub: [
				cn.make({ type: 'line', sub: [
					cn.make({ data: 'export class' }),
					cn.make({ data: cn.type  }),
					cn.make({ data: 'extends' }),
					body.make({ data: body.type }),
					cn.make({ data: '{' }),	
				]}),

				cn.make({ type: 'block', sub: body.sub.map($mol_view_tree_ts_method) }),

				cn.make({ data: '}' }),
			]
		})
	}
}
