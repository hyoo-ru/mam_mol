namespace $ {
	
	export function $mol_wire_graph( root: $mol_wire_pub_sub ) {
		
		const graph = new $mol_graph< $mol_wire_pub, number >()
		
		function visit( sub: $mol_wire_pub ) {
			
			if( 'sync' in sub ) {
				
				const fiber = sub as $mol_wire_fiber< any, any, any >
				try {
					fiber.sync()
				} catch( error: any ) {
					if( 'then' in error ) $mol_fail_hidden( error )
				}
				
				for( const [ index, pub ] of fiber.pub_list.entries() ) {
					graph.link( sub, pub, index )
					visit( pub )
				}
				
			}
			
		}
		visit( root )
		
		return graph
	}
	
}
