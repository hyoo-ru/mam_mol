namespace $ {
	export class $mol_layout_demo extends $mol_example_large {
		
		/**
		 * ```tree
		 * title \Custom flex layout engine
		 * ```
		 */
		title() {
			return "Custom flex layout engine"
		}
		
		/**
		 * ```tree
		 * sub / <= Sample
		 * ```
		 */
		sub() {
			return [
				this.Sample()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags / \layout
		 * ```
		 */
		tags() {
			return [
				"layout"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget
		 * ```
		 */
		aspects() {
			return [
				"Widget"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * paint null
		 * ```
		 */
		paint() {
			return null as any
		}
		
		/**
		 * ```tree
		 * context
		 * ```
		 */
		context() {
			return this.Sample().context()
		}
		
		/**
		 * ```tree
		 * width
		 * ```
		 */
		width() {
			return this.Sample().width()
		}
		
		/**
		 * ```tree
		 * height
		 * ```
		 */
		height() {
			return this.Sample().height()
		}
		
		/**
		 * ```tree
		 * Sample $mol_canvas
		 * 	paint <= paint
		 * 	context => context
		 * 	width => width
		 * 	height => height
		 * ```
		 */
		@ $mol_mem
		Sample() {
			const obj = new this.$.$mol_canvas()
			
			obj.paint = () => this.paint()
			
			return obj
		}
	}
	
}

