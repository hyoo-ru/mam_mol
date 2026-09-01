namespace $ {
	
	const keywords = new Set([
		'',
		'.byte',
		'.sequence',
		'.set_of',
		'.optional',
		'.list_of',
		'.any_of',
		'.except',
		'.with_delimiter',
	])
	
	export function $mol_tree2_grammar_check( grammar: $mol_tree2 ) {

		function visit( node: $mol_tree2 ) {

			check: {
				if( keywords.has( node.type ) ) break check
				if( grammar.select( node.type ).kids.length ) break check
				$mol_fail( node.error( `Wrong pattern name` ) )
			}
			
			for( const kid of node.kids ) {
				visit( kid )
			}

		}

		visit( grammar )

		return grammar
	}

}
