namespace $ {
	
	export class $mol_xpath {
		
		constructor( readonly path: string ) {}
		
		bool( node: Node ) {
			return $mol_dom_context.document.evaluate(
				this.path,
				node,
				null,
				$mol_dom_context.XPathResult.BOOLEAN_TYPE,
			).booleanValue
		}
		
		numb( node: Node ) {
			return $mol_dom_context.document.evaluate(
				this.path,
				node,
				null,
				$mol_dom_context.XPathResult.NUMBER_TYPE,
			).numberValue
		}
		
		str( node: Node ) {
			return $mol_dom_context.document.evaluate(
				this.path,
				node,
				null,
				$mol_dom_context.XPathResult.STRING_TYPE,
			).stringValue
		}
		
		first( node: Node ) {
			return $mol_dom_context.document.evaluate(
				this.path,
				node,
				null,
				$mol_dom_context.XPathResult.FIRST_ORDERED_NODE_TYPE,
			).singleNodeValue
		}
		
		*all( node: Node ) {
			
			const res = $mol_dom_context.document.evaluate(
				this.path,
				node,
				null,
				$mol_dom_context.XPathResult.ORDERED_NODE_ITERATOR_TYPE,
			)
			
			while( true ) {
				
				const next = res.iterateNext()
				
				if( next ) yield next
				else return
				
			}
			
		}
		
	}
	
}
