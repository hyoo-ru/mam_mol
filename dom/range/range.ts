namespace $ {
	export class $mol_dom_range extends Object {
		
		constructor(
			readonly head: $mol_dom_point,
			readonly foot: $mol_dom_point,
		) { super() }
		
		static from_selection( sel = $mol_dom_context.getSelection()! ) {
			return this.from_native( sel?.getRangeAt(0) )
		}
		
		static from_native( range: Range ) {
			return new this(
				new $mol_dom_point( range.startContainer, range.startOffset ),
				new $mol_dom_point( range.endContainer, range.endOffset ),
			)
		}
		
		static inside( node: Node ) {
			return new this(
				$mol_dom_point.start( node ),
				$mol_dom_point.end( node ),
			)
		}
		
		static around( node: Node ) {
			
			const parent = node.parentNode!
			const pos = [ ... parent.childNodes ].indexOf( node as ChildNode )
			
			return new this(
				new $mol_dom_point( parent, pos ),
				new $mol_dom_point( parent, pos + 1 ),
			)
			
		}
		
		is_empty() {
			return this.head.node === this.foot.node && this.head.pos === this.foot.pos
		}
		
		clear() {
			this.native().deleteContents()
		}
		
		select() {
			const sel = $mol_dom_context.document.getSelection()!
			sel.removeAllRanges()
			sel.addRange( this.native() )
		}
		
		native() {
			const range = $mol_dom_context.document.createRange()
			range.setEnd( this.foot.node, this.foot.pos )
			range.setStart( this.head.node, this.head.pos )
			return range
		}
		
	}
}
