namespace $ {
	export class $mol_pop_demo extends $mol_example {
		
		/**
		 * ```tree
		 * title \Pop up block with various alignment
		 * ```
		 */
		title() {
			return "Pop up block with various alignment"
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Manage
		 * 	<= Pop_area
		 * ```
		 */
		sub() {
			return [
				this.Manage(),
				this.Pop_area()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\popup
		 * 	\menu
		 * 	\align
		 * 	\container
		 * 	\modal
		 * ```
		 */
		tags() {
			return [
				"popup",
				"menu",
				"align",
				"container",
				"modal"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget/Float
		 * ```
		 */
		aspects() {
			return [
				"Widget/Float"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * show_title \Showed
		 * ```
		 */
		show_title() {
			return "Showed"
		}
		
		/**
		 * ```tree
		 * pop_showed_check_hint \$mol_pop showed
		 * ```
		 */
		pop_showed_check_hint() {
			return "$mol_pop showed"
		}
		
		/**
		 * ```tree
		 * pop_showed? true
		 * ```
		 */
		@ $mol_mem
		pop_showed(next?: any) {
			if ( next !== undefined ) return next as never
			return true
		}
		
		/**
		 * ```tree
		 * Show_check $mol_check_box
		 * 	hint <= pop_showed_check_hint
		 * 	checked? <=> pop_showed?
		 * ```
		 */
		@ $mol_mem
		Show_check() {
			const obj = new this.$.$mol_check_box()
			
			obj.hint = () => this.pop_showed_check_hint()
			obj.checked = (next?: any) => this.pop_showed(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Showed $mol_labeler
		 * 	title <= show_title
		 * 	content / <= Show_check
		 * ```
		 */
		@ $mol_mem
		Showed() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => this.show_title()
			obj.content = () => [
				this.Show_check()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * align_title \Align
		 * ```
		 */
		align_title() {
			return "Align"
		}
		
		/**
		 * ```tree
		 * pop_align? \bottom_right
		 * ```
		 */
		@ $mol_mem
		pop_align(next?: any) {
			if ( next !== undefined ) return next as never
			return "bottom_right"
		}
		
		/**
		 * ```tree
		 * aligins *
		 * 	left_top \left_top
		 * 	left_center \left_center
		 * 	left_bottom \left_bottom
		 * 	right_top \right_top
		 * 	right_center \right_center
		 * 	right_bottom \right_bottom
		 * 	center \center
		 * 	top_left \top_left
		 * 	top_center \top_center
		 * 	top_right \top_right
		 * 	bottom_left \bottom_left
		 * 	bottom_center \bottom_center
		 * 	bottom_right \bottom_right
		 * ```
		 */
		aligins() {
			return {
				left_top: "left_top",
				left_center: "left_center",
				left_bottom: "left_bottom",
				right_top: "right_top",
				right_center: "right_center",
				right_bottom: "right_bottom",
				center: "center",
				top_left: "top_left",
				top_center: "top_center",
				top_right: "top_right",
				bottom_left: "bottom_left",
				bottom_center: "bottom_center",
				bottom_right: "bottom_right"
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * Align_select $mol_switch
		 * 	value? <=> pop_align?
		 * 	options <= aligins
		 * ```
		 */
		@ $mol_mem
		Align_select() {
			const obj = new this.$.$mol_switch()
			
			obj.value = (next?: any) => this.pop_align(next)
			obj.options = () => this.aligins()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Align $mol_labeler
		 * 	title <= align_title
		 * 	content / <= Align_select
		 * ```
		 */
		@ $mol_mem
		Align() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => this.align_title()
			obj.content = () => [
				this.Align_select()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Manage $mol_row sub /
		 * 	<= Showed
		 * 	<= Align
		 * ```
		 */
		@ $mol_mem
		Manage() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Showed(),
				this.Align()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * anchor_button_icon $mol_icon_anchor
		 * ```
		 */
		@ $mol_mem
		anchor_button_icon() {
			const obj = new this.$.$mol_icon_anchor()
			
			return obj
		}
		
		/**
		 * ```tree
		 * anchor_button_title \Anchor
		 * ```
		 */
		anchor_button_title() {
			return "Anchor"
		}
		
		/**
		 * ```tree
		 * Pop_anchor $mol_button_major sub /
		 * 	<= anchor_button_icon
		 * 	<= anchor_button_title
		 * ```
		 */
		@ $mol_mem
		Pop_anchor() {
			const obj = new this.$.$mol_button_major()
			
			obj.sub = () => [
				this.anchor_button_icon(),
				this.anchor_button_title()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * bubble_hint \
		 * 	\This is
		 * 	\bubble_content
		 * ```
		 */
		bubble_hint() {
			return "This is\nbubble_content"
		}
		
		/**
		 * ```tree
		 * Content $mol_row
		 * 	minimal_width 150
		 * 	sub / <= bubble_hint
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_row()
			
			obj.minimal_width = () => 150
			obj.sub = () => [
				this.bubble_hint()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Pop $mol_pop
		 * 	Anchor <= Pop_anchor
		 * 	showed <= pop_showed
		 * 	align <= pop_align
		 * 	bubble_content / <= Content
		 * ```
		 */
		@ $mol_mem
		Pop() {
			const obj = new this.$.$mol_pop()
			
			obj.Anchor = () => this.Pop_anchor()
			obj.showed = () => this.pop_showed()
			obj.align = () => this.pop_align()
			obj.bubble_content = () => [
				this.Content()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Pop_area $mol_view sub / <= Pop
		 * ```
		 */
		@ $mol_mem
		Pop_area() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.Pop()
			] as readonly any[]
			
			return obj
		}
	}
	
}

