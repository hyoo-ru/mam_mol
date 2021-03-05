namespace $ {
	export class $mol_pop extends $mol_view {
		
		/**
		 * ```tree
		 * event * keydown?event <=> keydown?event
		 * ```
		 */
		event() {
			return {
				keydown: (event?: any) => this.keydown(event)
			}
		}
		
		/**
		 * ```tree
		 * showed?val false
		 * ```
		 */
		@ $mol_mem
		showed(val?: any) {
			if ( val !== undefined ) return val
			return false
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Anchor
		 * 	<= Bubble
		 * ```
		 */
		sub() {
			return [
				this.Anchor(),
				this.Bubble()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * keydown?event null
		 * ```
		 */
		@ $mol_mem
		keydown(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}
		
		/**
		 * ```tree
		 * Anchor null
		 * ```
		 */
		Anchor() {
			return null as any
		}
		
		/**
		 * ```tree
		 * align \bottom_center
		 * ```
		 */
		align() {
			return "bottom_center"
		}
		
		/**
		 * ```tree
		 * bubble_content /$mol_view_content
		 * ```
		 */
		bubble_content() {
			return [
			] as readonly $mol_view_content[]
		}
		
		/**
		 * ```tree
		 * height_max 9999
		 * ```
		 */
		height_max() {
			return 9999
		}
		
		/**
		 * ```tree
		 * Bubble $mol_pop_bubble
		 * 	align <= align
		 * 	content <= bubble_content
		 * 	height_max <= height_max
		 * ```
		 */
		@ $mol_mem
		Bubble() {
			const obj = new this.$.$mol_pop_bubble()
			
			obj.align = () => this.align()
			obj.content = () => this.bubble_content()
			obj.height_max = () => this.height_max()
			
			return obj
		}
	}
	
	export class $mol_pop_bubble extends $mol_scroll {
		
		/**
		 * ```tree
		 * sub <= content
		 * ```
		 */
		sub() {
			return this.content()
		}
		
		/**
		 * ```tree
		 * style *
		 * 	^
		 * 	maxHeight <= height_max
		 * ```
		 */
		style() {
			return {
				...super.style(),
				maxHeight: this.height_max()
			}
		}
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_pop_align <= align
		 * 	tabindex 0
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_pop_align: this.align(),
				tabindex: 0
			}
		}
		
		/**
		 * ```tree
		 * content /$mol_view_content
		 * ```
		 */
		content() {
			return [
			] as readonly $mol_view_content[]
		}
		
		/**
		 * ```tree
		 * height_max 9999
		 * ```
		 */
		height_max() {
			return 9999
		}
		
		/**
		 * ```tree
		 * align \
		 * ```
		 */
		align() {
			return ""
		}
	}
	
}

