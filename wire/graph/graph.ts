namespace $ {
	
	export function $mol_wire_graph( root: $mol_wire_pub_sub ) {
		
		const graph = new $mol_graph< $mol_wire_pub, number >()
		
		function visit( sub: $mol_wire_pub ) {
			
			try {
				sub['sync']?.()
			} catch( error: any ) {
				if( 'then' in error ) $mol_fail_hidden( error )
			}
			
			for( const [ index, pub ] of ( sub['pub_list']?.entries() ?? [] ) as [ number, $mol_wire_pub ][] ) {
				graph.link( sub, pub, index )
				visit( pub )
			}
			
		}
		visit( root )
		
		return graph
	}
	
}
