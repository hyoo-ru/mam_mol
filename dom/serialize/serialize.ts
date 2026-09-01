namespace $ {

	export function $mol_dom_serialize(
		node: Node
	) {
		const serializer = new $mol_dom_context.XMLSerializer
		return serializer.serializeToString( node )
	}

}
