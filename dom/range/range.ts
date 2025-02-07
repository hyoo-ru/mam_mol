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
			return new this(
				new $mol_dom_point( sel.anchorNode!, sel.anchorOffset ),
				new $mol_dom_point( sel.focusNode!, sel.focusOffset ),
			)
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

		container() {
			return this.native().commonAncestorContainer
		}
		
		is_empty() {
			return this.anchor.node === this.extend.node && this.anchor.pos === this.extend.pos
		}

		swap() {
			return new $mol_dom_range( this.extend, this.anchor )
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
			return this.native().comparePoint( ... point.native() )
		}
		
		point_bound( point: $mol_dom_point ) {
			const zone = this.point_compare( point )
			return zone < 0 ? this.anchor : zone > 0 ? this.extend : point
		}
		
		range_contains( range: $mol_dom_range ) {
			return ( this.point_compare( range.anchor ) === 0 )&&( this.point_compare( range.extend ) === 0 )
		}

		range_bounds( range: $mol_dom_range ) {
			return new $mol_dom_range(
				this.point_bound( range.anchor ),
				this.point_bound( range.extend ),
			)
		}

		select() {
			
			const [ anchorNode, anchorOffset ] = this.anchor.native()
			const [ focusNode, focusOffset ] = this.extend.native()

			const sel = $mol_dom_context.document.getSelection()!
			sel.setBaseAndExtent( anchorNode, anchorOffset, focusNode, focusOffset )

			return this
		}
		
		native() {

			const range = $mol_dom_context.document.createRange()

			if( this.anchor.is_tail() ) range.setStartAfter( this.anchor.node )
			else range.setStart( this.anchor.node, this.anchor.pos )

			if( this.extend.is_tail() ) range.setEndAfter( this.extend.node )
			else range.setEnd( this.extend.node, this.extend.pos )		
		
			return range
		}
		
	}
}
