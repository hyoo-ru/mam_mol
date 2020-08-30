namespace $ {
	export class $mol_pop extends $mol_view {

		/**
		 * ```tree
		 * event * keydown?event <=> keydown?event null
		 * ```
		 */
		event() {
			return {
				keydown: (event?: any) => this.keydown(event)
			}
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
		 * plugins /$mol_plugin <= Meter $mol_meter
		 * 	top => top
		 * 	bottom => bottom
		 * 	left => left
		 * 	right => right
		 * ```
		 */
		plugins() {
			return [
				this.Meter()
			] as readonly $mol_plugin[]
		}

		/**
		 * ```tree
		 * Meter $mol_meter
		 * 	top => top
		 * 	bottom => bottom
		 * 	left => left
		 * 	right => right
		 * ```
		 */
		@ $mol_mem
		Meter() {
			const obj = new this.$.$mol_meter()

			return obj
		}

		/**
		 * ```tree
		 * top
		 * ```
		 */
		top() {
			return this.Meter().top()
		}

		/**
		 * ```tree
		 * bottom
		 * ```
		 */
		bottom() {
			return this.Meter().bottom()
		}

		/**
		 * ```tree
		 * left
		 * ```
		 */
		left() {
			return this.Meter().left()
		}

		/**
		 * ```tree
		 * right
		 * ```
		 */
		right() {
			return this.Meter().right()
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Anchor null
		 * 	<= Bubble $mol_pop_bubble
		 * 		align <= align \bottom_center
		 * 		content <= bubble_content /$mol_view_content
		 * 		height_max <= height_max 9999
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
		 * Anchor null
		 * ```
		 */
		Anchor() {
			return null as any
		}

		/**
		 * ```tree
		 * Bubble $mol_pop_bubble
		 * 	align <= align \bottom_center
		 * 	content <= bubble_content /$mol_view_content
		 * 	height_max <= height_max 9999
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
	}

	export class $mol_pop_bubble extends $mol_scroll {

		/**
		 * ```tree
		 * sub <= content /$mol_view_content
		 * ```
		 */
		sub() {
			return this.content()
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
		 * style *
		 * 	^
		 * 	maxHeight <= height_max 9999
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
		 * height_max 9999
		 * ```
		 */
		height_max() {
			return 9999
		}

		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_pop_align <= align \
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
		 * align \
		 * ```
		 */
		align() {
			return ""
		}
	}

}
