namespace $ {
	export class $mol_select_demo_colors extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Color picker with filter and custom rows
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_select_demo_colors_title' )
		}

		/**
		 * ```tree
		 * sub / <= Color $mol_select
		 * 	value?val <=> color?val \
		 * 	dictionary <= colors *
		 * 	option_label!id <= color_name!id \
		 * 	option_content!id <= option_content!id / <= Color_option!id $mol_row
		 * 		sub /
		 * 			<= Color_preview!id $mol_select_colors_color_preview color <= option_color!id \
		 * 			<= color_name!id \
		 * 		minimal_height 40
		 * ```
		 */
		sub() {
			return [
				this.Color()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Color $mol_select
		 * 	value?val <=> color?val \
		 * 	dictionary <= colors *
		 * 	option_label!id <= color_name!id \
		 * 	option_content!id <= option_content!id / <= Color_option!id $mol_row
		 * 		sub /
		 * 			<= Color_preview!id $mol_select_colors_color_preview color <= option_color!id \
		 * 			<= color_name!id \
		 * 		minimal_height 40
		 * ```
		 */
		@ $mol_mem
		Color() {
			const obj = new this.$.$mol_select()

			obj.value = (val?: any) => this.color(val)
			obj.dictionary = () => this.colors()
			obj.option_label = (id: any) => this.color_name(id)
			obj.option_content = (id: any) => this.option_content(id)

			return obj
		}

		/**
		 * ```tree
		 * color?val \
		 * ```
		 */
		@ $mol_mem
		color(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * colors *
		 * ```
		 */
		colors() {
			return {

			}
		}

		/**
		 * ```tree
		 * color_name!id \
		 * ```
		 */
		color_name(id: any) {
			return ""
		}

		/**
		 * ```tree
		 * option_content!id / <= Color_option!id $mol_row
		 * 	sub /
		 * 		<= Color_preview!id $mol_select_colors_color_preview color <= option_color!id \
		 * 		<= color_name!id \
		 * 	minimal_height 40
		 * ```
		 */
		option_content(id: any) {
			return [
				this.Color_option(id)
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Color_option!id $mol_row
		 * 	sub /
		 * 		<= Color_preview!id $mol_select_colors_color_preview color <= option_color!id \
		 * 		<= color_name!id \
		 * 	minimal_height 40
		 * ```
		 */
		@ $mol_mem_key
		Color_option(id: any) {
			const obj = new this.$.$mol_row()

			obj.sub = () => [
				this.Color_preview(id),
				this.color_name(id)
			] as readonly any[]
			obj.minimal_height = () => 40

			return obj
		}

		/**
		 * ```tree
		 * Color_preview!id $mol_select_colors_color_preview color <= option_color!id \
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
		 * option_color!id \
		 * ```
		 */
		option_color(id: any) {
			return ""
		}
	}

	export class $mol_select_colors_color_preview extends $mol_view {

		/**
		 * ```tree
		 * style *
		 * 	^
		 * 	background <= color \
		 * ```
		 */
		style() {
			return {
				...super.style(),
				background: this.color()
			}
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
