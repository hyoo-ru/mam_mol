namespace $ {
	export class $mol_perf_sierp extends $mol_view {

		/**
		 * ```tree
		 * size_target 25
		 * ```
		 */
		size_target() {
			return 25
		}

		/**
		 * ```tree
		 * elapsed?val 0
		 * ```
		 */
		@ $mol_mem
		elapsed(val?: any) {
			if ( val !== undefined ) return val
			return 0
		}

		/**
		 * ```tree
		 * style * transform <= transform \
		 * ```
		 */
		style() {
			return {
				transform: this.transform()
			}
		}

		/**
		 * ```tree
		 * transform \
		 * ```
		 */
		transform() {
			return ""
		}

		/**
		 * ```tree
		 * sub / <= Dots $mol_view sub <= dots /
		 * ```
		 */
		sub() {
			return [
				this.Dots()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Dots $mol_view sub <= dots /
		 * ```
		 */
		@ $mol_mem
		Dots() {
			const obj = new this.$.$mol_view()

			obj.sub = () => this.dots()

			return obj
		}

		/**
		 * ```tree
		 * dots /
		 * ```
		 */
		dots() {
			return [

			] as readonly any[]
		}

		/**
		 * ```tree
		 * Dot!id $mol_perf_sierp_dot
		 * 	left <= left!id 0
		 * 	top <= top!id 0
		 * 	size <= size!id 25
		 * 	text <= text \
		 * ```
		 */
		@ $mol_mem_key
		Dot(id: any) {
			const obj = new this.$.$mol_perf_sierp_dot()

			obj.left = () => this.left(id)
			obj.top = () => this.top(id)
			obj.size = () => this.size(id)
			obj.text = () => this.text()

			return obj
		}

		/**
		 * ```tree
		 * left!id 0
		 * ```
		 */
		left(id: any) {
			return 0
		}

		/**
		 * ```tree
		 * top!id 0
		 * ```
		 */
		top(id: any) {
			return 0
		}

		/**
		 * ```tree
		 * size!id 25
		 * ```
		 */
		size(id: any) {
			return 25
		}

		/**
		 * ```tree
		 * text \
		 * ```
		 */
		text() {
			return ""
		}
	}

	export class $mol_perf_sierp_dot extends $mol_view {

		/**
		 * ```tree
		 * size 25
		 * ```
		 */
		size() {
			return 25
		}

		/**
		 * ```tree
		 * size_px \25px
		 * ```
		 */
		size_px() {
			return "25px"
		}

		/**
		 * ```tree
		 * hover?val false
		 * ```
		 */
		@ $mol_mem
		hover(val?: any) {
			if ( val !== undefined ) return val
			return false
		}

		/**
		 * ```tree
		 * sub / <= text \
		 * ```
		 */
		sub() {
			return [
				this.text()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * text \
		 * ```
		 */
		text() {
			return ""
		}

		/**
		 * ```tree
		 * style *
		 * 	width <= width <= size
		 * 	height <= height <= size
		 * 	left <= left 0
		 * 	top <= top 0
		 * 	borderRadius <= radius <= size
		 * 	lineHeight <= size_px
		 * 	background <= color \
		 * ```
		 */
		style() {
			return {
				width: this.width(),
				height: this.height(),
				left: this.left(),
				top: this.top(),
				borderRadius: this.radius(),
				lineHeight: this.size_px(),
				background: this.color()
			}
		}

		/**
		 * ```tree
		 * width <= size
		 * ```
		 */
		width() {
			return this.size()
		}

		/**
		 * ```tree
		 * height <= size
		 * ```
		 */
		height() {
			return this.size()
		}

		/**
		 * ```tree
		 * left 0
		 * ```
		 */
		left() {
			return 0
		}

		/**
		 * ```tree
		 * top 0
		 * ```
		 */
		top() {
			return 0
		}

		/**
		 * ```tree
		 * radius <= size
		 * ```
		 */
		radius() {
			return this.size()
		}

		/**
		 * ```tree
		 * color \
		 * ```
		 */
		color() {
			return ""
		}

		/**
		 * ```tree
		 * event *
		 * 	^
		 * 	mouseenter?val <=> enter?val null
		 * 	mouseleave?val <=> leave?val null
		 * ```
		 */
		event() {
			return {
				...super.event(),
				mouseenter: (val?: any) => this.enter(val),
				mouseleave: (val?: any) => this.leave(val)
			}
		}

		/**
		 * ```tree
		 * enter?val null
		 * ```
		 */
		@ $mol_mem
		enter(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * leave?val null
		 * ```
		 */
		@ $mol_mem
		leave(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}
	}

}
