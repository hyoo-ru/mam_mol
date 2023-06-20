namespace $ {
	export class $mol_pop extends $mol_view {
		
		/**
		 * ```tree
		 * showed? false
		 * ```
		 */
		@ $mol_mem
		showed(next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * align_vert \
		 * ```
		 */
		align_vert() {
			return ""
		}
		
		/**
		 * ```tree
		 * align_hor \
		 * ```
		 */
		align_hor() {
			return ""
		}
		
		/**
		 * ```tree
		 * prefer \vert
		 * ```
		 */
		prefer() {
			return "vert"
		}
		
		/**
		 * ```tree
		 * sub / <= Anchor
		 * ```
		 */
		sub() {
			return [
				this.Anchor()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * sub_visible /
		 * 	<= Anchor
		 * 	<= Bubble
		 * ```
		 */
		sub_visible() {
			return [
				this.Anchor(),
				this.Bubble()
			] as readonly any[]
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
	
	export class $mol_pop_bubble extends $mol_view {
		
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
			} as Record< string, any >
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
			} as Record< string, any >
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

