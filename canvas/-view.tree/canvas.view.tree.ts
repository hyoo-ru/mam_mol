namespace $ {
	export class $mol_canvas extends $mol_view {
		
		/**
		 * ```tree
		 * dom_name \canvas
		 * ```
		 */
		dom_name() {
			return "canvas"
		}
		
		/**
		 * ```tree
		 * context CanvasRenderingContext2D
		 * ```
		 */
		@ $mol_mem
		context() {
			const obj = new this.$.CanvasRenderingContext2D()
			
			return obj
		}
		
		/**
		 * ```tree
		 * field *
		 * 	^
		 * 	width <= width
		 * 	height <= height
		 * ```
		 */
		field() {
			return {
				...super.field(),
				width: this.width(),
				height: this.height()
			}
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
		 * width 0
		 * ```
		 */
		width() {
			return 0
		}
		
		/**
		 * ```tree
		 * height 0
		 * ```
		 */
		height() {
			return 0
		}
	}
	
}

