namespace $ {

	export function $mol_dom_safe_uri( uri: string ) {
		return uri.replace( /^(?=\w+script+:)/, 'about:blank#' )
	}
	
	export function $mol_dom_safe_attr( val: string ) {
		return val
	}
	
	export let $mol_dom_safe_rules: Record< string, Record< string, ( val: string )=> string > > = {

		// defaults
		'': { id: $mol_dom_safe_attr },
		
		// special
		a: { href: $mol_dom_safe_uri },
		img: { src: $mol_dom_safe_uri },
		object: { src: $mol_dom_safe_uri },

		// blocks
		div: {},
		p: {},
		h1: {},
		h2: {},
		h3: {},
		h4: {},
		h5: {},
		h6: {},
		blockquote: {},
		pre: {},
		ul: {},
		ol: {},
		li: {},
		details: {},
		summary: {},
		hr: {},
		table: {},
		tr: {},
		td: {},

		// inlines
		span: {},
		strong: {},
		em: {},
		br: {},
		ins: {},
		del: {},
		code: {},

	}

	export function $mol_dom_safe( this: $, nodes: ChildNode[] ) {
		
		const res = [] as ChildNode[]

		for( const node of nodes ) {

			if( node.nodeType === node.TEXT_NODE ) {
				res.push( node )
				continue
			}

			if( node.nodeType === node.ELEMENT_NODE ) {
				
				const kids = this.$mol_dom_safe([ ... node.childNodes ])

				const allowed = this.$mol_dom_safe_rules[ ( node as Element ).localName ]
				if( !allowed ) {
					res.push( ... kids )
					continue
				}

				for( const attr of [ ... ( node as Element ).attributes ] ) {
					const proc = allowed[ attr.localName ] ?? this.$mol_dom_safe_rules[''][ attr.localName ]
					if( proc ) attr.nodeValue = proc( attr.nodeValue! )
					else ( node as Element ).removeAttribute( attr.nodeName )
				}

				$mol_dom_render_children( node as Element, kids )
				res.push( node )
				continue
				
			}

		}

		return res
	}


}
