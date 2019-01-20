namespace $ {

	const $mol_tree_wasm_nodes : {
		[ type : string ] : ( sub : ( node : $mol_tree )=> number[] , node : $mol_tree )=> number[]
	} = {

		'' : ( sub , node )=> sub( node ) ,
		
		module : ( sub , node )=> [ 0 , 0x61 , 0x73 , 0x6d , 0x1 , 0 , 0 , 0 , ... sub( node ) ] ,
		
		section : ( sub , node ) => {
			
			const type_name = node.select( 'id' , '' ).sub[0].type
			const type = $mol_wasm_section_types[ type_name ]
			if( !type ) throw new Error( `Unknown section type: ${ type_name }` )
			
			const payload = sub( node.select( 'payload' ).sub[0] )
			return [ type , payload.length + 1 , 0 , ... payload ]

		} ,

	}

	export function $mol_tree_wasm_compile( code : $mol_tree ) {

		function visit_node( node : $mol_tree ) : number[] {
			const visit_sub = ( node : $mol_tree )=> [].concat( ... node.sub.map( visit_node ) )
			return $mol_tree_wasm_nodes[ node.type ]( visit_sub ,  node )
		}

		return new $mol_wasm_module( new Uint8Array( visit_node( code ) ).buffer )
	}

}
