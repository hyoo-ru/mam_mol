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
		 * elapsed? 0
		 * ```
		 */
		@ $mol_mem
		elapsed(next?: any) {
			if ( next !== undefined ) return next as never
			return 0
		}
		
		/**
		 * ```tree
		 * style * transform <= transform
		 * ```
		 */
		style() {
			return {
				transform: this.transform()
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * sub / <= Dots
		 * ```
		 */
		sub() {
			return [
				this.Dots()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Dot* $mol_perf_sierp_dot
		 * 	left <= left*
		 * 	top <= top*
		 * 	size <= size*
		 * 	text <= text
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
		 * transform \
		 * ```
		 */
		transform() {
			return ""
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
		 * Dots $mol_view sub <= dots
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
		 * left* 0
		 * ```
		 */
		left(id: any) {
			return 0
		}
		
		/**
		 * ```tree
		 * top* 0
		 * ```
		 */
		top(id: any) {
			return 0
		}
		
		/**
		 * ```tree
		 * size* 25
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
		 * hover? false
		 * ```
		 */
		@ $mol_mem
		hover(next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * sub / <= text
		 * ```
		 */
		sub() {
			return [
				this.text()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * style *
		 * 	width <= width
		 * 	height <= height
		 * 	left <= left
		 * 	top <= top
		 * 	borderRadius <= radius
		 * 	lineHeight <= size_px
		 * 	background <= color
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
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * event *
		 * 	^
		 * 	mouseenter? <=> enter?
		 * 	mouseleave? <=> leave?
		 * ```
		 */
		event() {
			return {
				...super.event(),
				mouseenter: (next?: any) => this.enter(next),
				mouseleave: (next?: any) => this.leave(next)
			} as Record< string, any >
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
		 * enter? null
		 * ```
		 */
		@ $mol_mem
		enter(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * leave? null
		 * ```
		 */
		@ $mol_mem
		leave(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
	}
	
}

