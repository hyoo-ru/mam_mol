namespace $ {
	
	export class $mol_dom_point extends Object {
		
		constructor(
			readonly node: Node,
			readonly pos: number,
		) {
			super()
			
			if( pos <= 0 ) return
			if( node.nodeValue ) return
			
			this.node = this.node.childNodes[ pos - 1 ]
			if( !this.node ) $mol_fail( new Error( 'node is undefined' ) )
			
			this.pos = -1

		}
		
		/** Iterator for deep comparison. */
		[ Symbol.iterator ]() {
			return [ this.node, this.pos ].values()
		}
		
		/** Point before the node. */
		static nose( node: Node ) {
			return node.previousSibling
				? new this( node.previousSibling, -1 )
				: new this( node.parentNode!, 0 )
		}
		
		/** Point after start of the node. */
		static head( node: Node ) {
			return new this( node, 0 )
		}
		
		/** Point before end of the node. */
		static foot( node: Node ) {
			const length = node.nodeValue?.length ?? node.childNodes.length
			return new this( node, length )
		}

		/** Point after the node. */
		static tail( node: Node ) {
			return new this( node, -1 )
		}

		/** Is point after start of the node. */
		is_head() {
			return this.pos === 0
		}
		
		/** Is point before end of the node. */
		is_foot() {
			if( this.is_tail() ) return !this.node.nextSibling
			else return this.pos === ( this.node.nodeValue?.length ?? this.node.childNodes.length )
		}

		/** Is point after end of the node. */
		is_tail() {
			return this.pos === -1
		}
		
		/** Point after start of the node. */
		head() {
			return $mol_dom_point.head( this.node )
		}
		
		/** Point before end of the node. */
		foot() {
			if( this.is_tail() ) return $mol_dom_point.foot( this.node.parentNode! )
			else return $mol_dom_point.foot( this.node )
		}
		
		/** Point after end of the node. */
		tail() {
			return $mol_dom_point.tail( this.node )
		}

		native() {
			
			if( !this.is_tail() ) return [ this.node, this.pos ] as const
			
			return [
				this.node.parentNode!,
				[ ... this.node.parentNode!.childNodes ].indexOf( this.node as ChildNode ) + 1,
			] as const
			
		}
		
		/** Finds child of container which contains this point. */
		lifted_to( container: Node ): Node {
			
			if( this.node === container ) return container
			if( this.node.parentNode === container ) return this.node
			
			return $mol_dom_point.head( this.node.parentNode! ).lifted_to( container )
		}
		
		/** Point near the node. -1: before, +1: after. */
		static near( node: Node, axis: -1 | 1 ) {

			const parent = node.parentElement
			if( !parent ) return null

			if( axis < 0 ) return node.previousSibling
				? $mol_dom_point.tail( node.previousSibling )
				: $mol_dom_point.head( parent )

			return $mol_dom_point.tail( node )

		}
		
		/** Point near the node. -1: before, +1: after. */
		jump( axis: -1 | 1 ) {
			if( this.is_tail() ) {
				return $mol_dom_point.near( this.node.parentNode!, axis )
			} else {
				return $mol_dom_point.near( this.node, axis )
			}
		}

		/** Point at one step in some direction. */
		move_step( axis: -1 | 1 ) {
			if( axis > 0 ) {
				if( this.is_tail() ) {
					const next = this.node.nextSibling
					if( next ) return $mol_dom_point.head( next )
					else return this.jump(+1)
				} else if( this.is_foot() ) {
					return this.jump(+1)
				} else {
					const next = this.node.firstChild
					if( next ) return $mol_dom_point.head( next )
					return new $mol_dom_point( this.node, this.pos + 1 )
				}
			} else {
				if( this.is_tail() ) {
					const next = this.node.lastChild
					if( next ) return $mol_dom_point.tail( next )
					else return $mol_dom_point.head( this.node )
				} else if( this.is_head() ) {
					return this.jump(-1)
				} else {
					return new $mol_dom_point( this.node, this.pos + 1 )
				}
			}
		}

		move_chars( root: Element, offset: number ): $mol_dom_point {
			
			if( offset === 0 ) return this
			if( this.node === root && this.is_tail() ) return $mol_dom_point.foot( root )

			const axis = Math.sign( offset ) as -1 | 0 | 1
			if( axis < 0 ) $mol_fail( new Error( 'Unsupported yet' ) )
			
			if( this.node.nodeValue && this.pos >= 0 ) {

				const pos = this.pos + offset
				const len = this.node.nodeValue.length

				if( pos <= len ) return new $mol_dom_point( this.node, pos )
				else return $mol_dom_point.tail( this.node ).move_chars( root, pos - len )

			} else {

				return this.move_step( axis || 1 )?.move_chars( root, offset )
					?? $mol_dom_point.foot( root )
				
			}

		}
		
		// split( ) {
			
		// 	if( this.is_tail() ) {
		// 		if( !this.node.nextSibling ) return $mol_dom_point.tail( this.node.parentNode as Element )
		// 		const tail = this.node.parentElement
		// 	}
			
		// 	switch( this.node.nodeType ) {
		// 		case this.node.ELEMENT_NODE: {
		// 		}
		// 	}
			
		// }

	}
	
}
