namespace $ {
	
	export class $mol_dom_point extends Object {
		
		constructor(
			public node: Node,
			public pos: number,
		) { super() }
		
		static start( node: Node ) {
			return new this( node, 0 )
		} 
		
		static end( node: Node ) {
			const length = node.nodeValue?.length ?? node.childNodes.length
			return new this( node, length )
		}
		
		to( point: $mol_dom_point ) {
			this.node = point.node
			this.pos = point.pos
		}
		
		to_start() {
			this.pos = 0
			return this
		}
		
		to_end() {
			this.pos = this.node.nodeValue?.length ?? this.node.childNodes.length
			return this
		}
		
		is_start() {
			return this.pos <= 0
		}
		
		is_end() {
			return this.pos >= ( this.node.nodeValue?.length ?? this.node.childNodes.length )
		}
		
		char_backward( root: Element ): $mol_dom_point {
			return this.backward( ()=> {
				if( this.node === root && this.is_start() ) return true
				if( this.node.nodeType !== this.node.TEXT_NODE ) return false
				if( this.is_start() ) return false
				this.pos -= 1
				return true
			} )
		}
		
		char_forward( root: Element ): $mol_dom_point {
			return this.forward( ()=> {
				if( this.node === root && this.is_end() ) return true
				if( this.node.nodeType !== this.node.TEXT_NODE ) return false
				if( this.is_end() ) return false
				this.pos += 1
				return true
			} )
		}
		
		backward( check: ()=> boolean ): $mol_dom_point {
			
			if( check() ) return this
			
			if( !this.is_start() ) {
				const kid = this.node.childNodes[ this.pos - 1 ]
				this.node = kid
				this.to_end()
				return this.backward( check )
			}
			
			const parent = this.node.parentElement
			if( !parent ) return this
			
			const offset = [ ... parent.childNodes ].indexOf( this.node as ChildNode )
			this.node = parent
			this.pos = offset
			return this.backward( check )
			
		}
		
		forward( check: ()=> boolean ): $mol_dom_point {
			
			if( check() ) return this
			
			if( !this.is_end() ) {
				const kid = this.node.childNodes[ this.pos ]
				this.node = kid
				this.to_start()
				return this.forward( check )
			}
			
			const parent = this.node.parentElement
			if( !parent ) return this
			
			const offset = [ ... parent.childNodes ].indexOf( this.node as ChildNode ) + 1
			this.node = parent
			this.pos = offset
			return this.forward( check )
			
		}
		
	}
	
}
