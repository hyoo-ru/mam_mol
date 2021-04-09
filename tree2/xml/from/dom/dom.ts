namespace $ {
	
	export function $mol_tree2_xml_from_dom( dom: Node ): $mol_tree2 {
		
		switch( dom.nodeType ) {
			
			case dom.DOCUMENT_NODE: {
				let kids = [] as $mol_tree2[]
				
				for( const kid of dom.childNodes ) {
					kids.push( $mol_tree2_xml_from_dom( kid ) )
				}
				
				return $mol_tree2.list( kids )
			}
			
			case dom.PROCESSING_INSTRUCTION_NODE: {
				return $mol_tree2.struct( '?', [
					$mol_tree2.struct( dom.nodeName, 
						dom.nodeValue!.split(' ').map( chunk => {
							const [, name, value ] = /^(.*?)(?:="(.*?)")?$/.exec( chunk )!
							const kids = value ? [ $mol_tree2.data( value ) ] : []
							return $mol_tree2.struct( name, kids )
						} )
					)
				] )
			}
			
			case dom.DOCUMENT_TYPE_NODE: {
				const dom2 = dom as DocumentType
				return $mol_tree2.struct( '!', [
					$mol_tree2.struct( 'DOCTYPE', [ 
						$mol_tree2.struct( dom2.name )
					] )
				] )
			}
			
			case dom.ELEMENT_NODE: {
				let kids = [] as $mol_tree2[]
				
				for( const attr of ( dom as Element ).attributes ) {
					kids.push(
						$mol_tree2.struct( '@', [
							$mol_tree2.struct( attr.nodeName, [
								$mol_tree2.data( attr.nodeValue! )
							] )
						] )
					)
				}
				
				for( const kid of dom.childNodes ) {
					const k = $mol_tree2_xml_from_dom( kid ) 
					if( k.type || k.value ) kids.push( k )
				}
				
				return $mol_tree2.struct( dom.nodeName, kids )
			}
			
			case dom.COMMENT_NODE: {
				return $mol_tree2.struct( '--', [
					$mol_tree2.data( dom.nodeValue! )
				] )
			}
			
			case dom.TEXT_NODE: {
				if( !dom.nodeValue!.trim() ) return $mol_tree2.list([])
				return $mol_tree2.data(
					dom.nodeValue!.replace( /\s+/g, ' ' )
				)
			}
			
		}
		
		return $mol_fail( new Error( `Unsupported node ${ dom.nodeName }` ) )
	}
	
}
