namespace $ {
	export class $mol_select_demo_colors extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Color picker with filter and custom rows
		 * ```
		 */
		title() {
			return "Color picker with filter and custom rows"
		}
		
		/**
		 * ```tree
		 * sub / <= Color
		 * ```
		 */
		sub() {
			return [
				this.Color()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\select
		 * 	\color
		 * 	\picker
		 * 	\filter
		 * ```
		 */
		tags() {
			return [
				"select",
				"color",
				"picker",
				"filter"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Widget/Control
		 * ```
		 */
		aspects() {
			return [
				"Widget/Control"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * color? \
		 * ```
		 */
		@ $mol_mem
		color(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * colors *
		 * ```
		 */
		colors() {
			return {
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * color_name* \
		 * ```
		 */
		color_name(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * option_color* \
		 * ```
		 */
		option_color(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * Color_preview* $mol_select_colors_color_preview color <= option_color*
		 * ```
		 */
		@ $mol_mem_key
		Color_preview(id: any) {
			const obj = new this.$.$mol_select_colors_color_preview()
			
			obj.color = () => this.option_color(id)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Color_name* $mol_dimmer
		 * 	haystack <= color_name*
		 * 	needle <= color_filter
		 * ```
		 */
		@ $mol_mem_key
		Color_name(id: any) {
			const obj = new this.$.$mol_dimmer()
			
			obj.haystack = () => this.color_name(id)
			obj.needle = () => this.color_filter()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Color_option* $mol_view
		 * 	sub /
		 * 		<= Color_preview*
		 * 		<= Color_name*
		 * 	minimal_height 40
		 * ```
		 */
		@ $mol_mem_key
		Color_option(id: any) {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.Color_preview(id),
				this.Color_name(id)
			] as readonly any[]
			obj.minimal_height = () => 40
			
			return obj
		}
		
		/**
		 * ```tree
		 * option_content* / <= Color_option*
		 * ```
		 */
		option_content(id: any) {
			return [
				this.Color_option(id)
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * color_filter
		 * ```
		 */
		color_filter() {
			return this.Color().filter_pattern()
		}
		
		/**
		 * ```tree
		 * Color $mol_select
		 * 	filter_pattern => color_filter
		 * 	value? <=> color?
		 * 	dictionary <= colors
		 * 	option_label* <= color_name*
		 * 	option_content* <= option_content*
		 * ```
		 */
		@ $mol_mem
		Color() {
			const obj = new this.$.$mol_select()
			
			obj.value = (next?: any) => this.color(next)
			obj.dictionary = () => this.colors()
			obj.option_label = (id: any) => this.color_name(id)
			obj.option_content = (id: any) => this.option_content(id)
			
			return obj
		}
	}
	
	export class $mol_select_colors_color_preview extends $mol_view {
		
		/**
		 * ```tree
		 * style *
		 * 	^
		 * 	background <= color
		 * ```
		 */
		style() {
			return {
				...super.style(),
				background: this.color()
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * color \
		 * ```
		 */
		color() {
			return ""
		}
	}
	
}

