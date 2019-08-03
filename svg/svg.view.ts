namespace $.$$ {
	export class $mol_svg extends $.$mol_svg {
		@$mol_mem
		computed_style() {
			const win = this.$.$mol_dom_context
			const style = win.getComputedStyle(this.dom_node())

			if(!style['font-size']) $mol_state_time.now()

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

		text_width(text: string): number {
			return $mol_font_measure(this.font_size(), this.font_family(), text)
		}
	}
}
