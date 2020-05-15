namespace $ {
	/**
	 * Extract property parts: page!index?next
	 */
	export function $mol_view_tree_ts_method_signature(node: $mol_tree) {
		const sub = node.sub
		if( sub.length > 1 ) throw node.error( 'Too more sub' )
		const propName = node.type

		let indexPos = propName.indexOf('!')
		let valuePos = propName.indexOf('?')
		if (valuePos === -1) valuePos = propName.length
		if (indexPos === -1) indexPos = valuePos
		if (indexPos > valuePos) indexPos = valuePos

		const name = propName.substring(0, indexPos)
		const key = indexPos === valuePos ? '' : propName.substring(indexPos + 1, valuePos)
		const value = propName.substring(valuePos + 1)

		return {
			orig: node,
			name: node.make({ data: name }),
			key: key ? node.make({ data: key, col: node.col + indexPos }) : undefined,
			value: value ? node.make({ data: value, col: node.col + valuePos }) : undefined
		}
	}

	export type $mol_view_tree_ts_method_signature_type = ReturnType<typeof $mol_view_tree_ts_method_signature>
}
