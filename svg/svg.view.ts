namespace $.$$ {
	/** Base SVG component to display SVG images or icons. */
	export class $mol_svg extends $.$mol_svg {
		@$mol_mem
		computed_style() {
			const win = this.$.$mol_dom_context
			const style = win.getComputedStyle(this.dom_node()) as Record<string, any>

			if(!style['font-size']) $mol_state_time.now( 0 )

			return style
		}

		@$mol_mem
		font_size(): number {
			return parseInt(this.computed_style()['font-size']) || 16
		}

		@$mol_mem
		font_family() {
			return this.computed_style()['font-family']
		}

	}
}
