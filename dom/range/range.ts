namespace $ {
	export class $mol_dom_range extends Object {
		
		constructor(
			readonly anchor: $mol_dom_point,
			readonly extend: $mol_dom_point,
		) { super() }
		
		/** Iterator for deep comparison. */
		[ Symbol.iterator ]() {
			return [ this.anchor, this.extend ].values()
		}
		
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
				$mol_dom_point.head( node ),
				$mol_dom_point.foot( node ),
			)
		}
		
		static around( node: Node ) {
			return $mol_dom_range.inside( node ).expand()
		}
		
		is_empty() {
			return this.anchor.node === this.extend.node && this.anchor.pos === this.extend.pos
		}

		expand() {
			return new $mol_dom_range(
				this.anchor.jump(-1)!,
				this.extend.jump(+1)!,
			)
		}
		
		clear() {
			this.native().deleteContents()
		}

		surround( el: Element ) {
			this.native().surroundContents( el )
		}

		point_compare( point: $mol_dom_point ) {
			if( point.is_tail() ) return this.native().comparePoint(
				point.node.parentNode!,
				[ ... point.node.parentNode!.childNodes ].indexOf( point.node as ChildNode ),
			)
			else return this.native().comparePoint( point.node, point.pos )
		}
		
		range_contains( range: $mol_dom_range ) {
			return ( this.point_compare( range.anchor ) === 0 )&&( this.point_compare( range.extend ) === 0 )
		}

		select() {
			const sel = $mol_dom_context.document.getSelection()!
			sel.removeAllRanges()
			sel.addRange( this.native() )
		}
		
		native() {

			const range = $mol_dom_context.document.createRange()

			if( this.extend.is_tail() ) range.setEndAfter( this.extend.node )
			else range.setEnd( this.extend.node, this.extend.pos )
		
			if( this.anchor.is_tail() ) range.setStartAfter( this.anchor.node )
			else range.setStart( this.anchor.node, this.anchor.pos )

			return range
		}
		
	}
}
