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
		
		/** Makes range from selection with direction storing. */
		static from_selection( sel = $mol_dom_context.getSelection()! ) {
			if( sel.type === 'None' ) return null
			const anchor = new $mol_dom_point( sel.anchorNode!, sel.anchorOffset )
			const extend = new $mol_dom_point( sel.focusNode!, sel.focusOffset )
			return new this( anchor, extend )
		}
		
		/** Converts from native Range. */
		static from_native( range: Range ) {
			return new this(
				new $mol_dom_point( range.startContainer, range.startOffset ),
				new $mol_dom_point( range.endContainer, range.endOffset ),
			)
		}
		
		/** Surrounds whole node content. */
		static inside( node: Node ) {
			return new this(
				$mol_dom_point.head( node ),
				$mol_dom_point.foot( node ),
			)
		}
		
		/** Around node itself. */
		static around( node: Node ) {
			return $mol_dom_range.inside( node ).expand()
		}
		
		/** Deeper Element which contain whole selection. */
		container() {
			return this.native().commonAncestorContainer
		}
		
		/** Has now content. */
		is_empty() {
			return this.anchor.node === this.extend.node && this.anchor.pos === this.extend.pos
		}
		
		/** Swap start and end points. */
		swap() {
			return new $mol_dom_range( this.extend, this.anchor )
		}
		
		/** Returns new range expanded outside by one point steps. */
		expand() {
			return new $mol_dom_range(
				this.anchor.jump(-1)!,
				this.extend.jump(+1)!,
			)
		}
		
		/** Returns fragment of cloned content. */
		copy() {
			return this.native().cloneContents()
		}
		
		/** Removes all content and returns new collapsed range. */
		clear() {
			const range = this.native()
			range.deleteContents()
			return $mol_dom_range.from_native( range )
		}
		
		/** Removes all content and inserts given instead. */
		paste( node: Node ) {
			const range = this.clear().native()
			range.insertNode( node )
			return $mol_dom_range.from_native( range )
		}
		
		/** Wraps content by given element. */
		surround( el: Element ) {
			el.appendChild( this.copy() )
			return this.paste( el )
		}
		
		/**
		 * Returns position of point relate to this range.
		 * Before: -1
		 * Inside: 0
		 * After: +1
		 */
		point_compare( point: $mol_dom_point ) {
			return this.native().comparePoint( ... point.native() )
		}
		
		/** Is given range inside this. */
		range_contains( range: $mol_dom_range ) {
			return ( this.point_compare( range.anchor ) === 0 )&&( this.point_compare( range.extend ) === 0 )
		}
		
		/**
		 * Returns point which bounded by this range.
		 * Actualy returns middle of three points: anchor, given point, extend.
		 */
		point_bound( point: $mol_dom_point ) {
			const zone = this.point_compare( point )
			return zone < 0 ? this.anchor : zone > 0 ? this.extend : point
		}
		
		/** Returns new range which bounded by giiven. */
		range_bounds( range: $mol_dom_range ) {
			return new $mol_dom_range(
				this.point_bound( range.anchor ),
				this.point_bound( range.extend ),
			)
		}
		
		/** Aim selection to this range. */
		select() {
			
			const [ anchorNode, anchorOffset ] = this.anchor.native()
			const [ focusNode, focusOffset ] = this.extend.native()

			const sel = $mol_dom_context.document.getSelection()!
			console.log( 'select', anchorNode, anchorOffset, focusNode, focusOffset )
			sel.setBaseAndExtent( anchorNode, anchorOffset, focusNode, focusOffset )
			
			return this
		}
		
		/**
		 * Returns native DOM Range object.
		 * It's always forward direction.
		 */
		native() {
			
			const range = $mol_dom_context.document.createRange()
			
			if( this.anchor.is_tail() ) range.setStartAfter( this.anchor.node )
			else range.setStart( this.anchor.node, this.anchor.pos )
			
			if( this.extend.is_tail() ) range.setEndAfter( this.extend.node )
			else range.setEnd( this.extend.node, this.extend.pos )
		
			if( range.collapsed && !this.is_empty() ) {
				if( this.anchor.is_tail() ) range.setEndAfter( this.anchor.node )
				else range.setEnd( this.anchor.node, this.anchor.pos )
			}
			
			return range
		}
		
	}
}
