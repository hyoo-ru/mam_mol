namespace $ {

	/**
	 * Layout independent of content. 
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_layout_demo
	 */
	export class $mol_layout extends $mol_object {
		
		/** Orthogonal layout */
		ortho = null as null | $mol_layout

		/** Absolute calculated position. */
		pos = 0

		/** Actual calculated size. */
		size = 0

		/** Minimal required size. */
		min = 0

		/** Maximum size which can be used. */
		max = 0

		/** Baseline position relative to `pos`. */
		base = 0

		/** Policy to break line before. */
		break_before() { return $mol_layout_break.allow }
		
		/** Policy to break line after. */
		break_after() { return $mol_layout_break.allow }

		/** Content offset from beginnig. */
		before() { return 0 }

		/** Content offset from ending. */
		after() { return 0 }
		
		/** Differene between self and inner size. */
		padding() { return this.before() + this.after() }

		/** Available size for content. */
		limit() { return this.size - this.padding() }

		/** Growing priority. */
		grow() { return Math.max( 0, this.max - this.min ) }

		/** Shrinking priority. */
		shrink() { return this.min || 1 }

		/** Collects requirements. */
		up() {}
		
		/** Cacluates inner layout. */
		down() {}
		
		/** Refresh lyout for both dimensions */
		fresh() {
			this.up()
			this.down()
			this.ortho?.fresh()
		}

	}

}
