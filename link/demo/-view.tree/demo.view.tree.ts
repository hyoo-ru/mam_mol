namespace $ {
	export class $mol_link_demo extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Some hyperlinks
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_link_demo_title' )
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= This $mol_link sub / <= this_label @ \This page
		 * 	<= Red $mol_link
		 * 		arg * color \red
		 * 		sub / <= red_label @ \Red
		 * 	<= Green $mol_link
		 * 		arg * color \green
		 * 		sub / <= green_label @ \Green
		 * 	<= Blue $mol_link
		 * 		arg * color \blue
		 * 		sub / <= blue_label @ \Blue
		 * 	<= External $mol_link
		 * 		uri \http://example.org
		 * 		title \example.org
		 * 		hint <= external_hint @ \external link
		 * ```
		 */
		sub() {
			return [
				this.This(),
				this.Red(),
				this.Green(),
				this.Blue(),
				this.External()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * This $mol_link sub / <= this_label @ \This page
		 * ```
		 */
		@ $mol_mem
		This() {
			const obj = new this.$.$mol_link()

			obj.sub = () => [
				this.this_label()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * this_label @ \This page
		 * ```
		 */
		this_label() {
			return this.$.$mol_locale.text( '$mol_link_demo_this_label' )
		}

		/**
		 * ```tree
		 * Red $mol_link
		 * 	arg * color \red
		 * 	sub / <= red_label @ \Red
		 * ```
		 */
		@ $mol_mem
		Red() {
			const obj = new this.$.$mol_link()

			obj.arg = () => ({
				color: "red"
			})
			obj.sub = () => [
				this.red_label()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * red_label @ \Red
		 * ```
		 */
		red_label() {
			return this.$.$mol_locale.text( '$mol_link_demo_red_label' )
		}

		/**
		 * ```tree
		 * Green $mol_link
		 * 	arg * color \green
		 * 	sub / <= green_label @ \Green
		 * ```
		 */
		@ $mol_mem
		Green() {
			const obj = new this.$.$mol_link()

			obj.arg = () => ({
				color: "green"
			})
			obj.sub = () => [
				this.green_label()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * green_label @ \Green
		 * ```
		 */
		green_label() {
			return this.$.$mol_locale.text( '$mol_link_demo_green_label' )
		}

		/**
		 * ```tree
		 * Blue $mol_link
		 * 	arg * color \blue
		 * 	sub / <= blue_label @ \Blue
		 * ```
		 */
		@ $mol_mem
		Blue() {
			const obj = new this.$.$mol_link()

			obj.arg = () => ({
				color: "blue"
			})
			obj.sub = () => [
				this.blue_label()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * blue_label @ \Blue
		 * ```
		 */
		blue_label() {
			return this.$.$mol_locale.text( '$mol_link_demo_blue_label' )
		}

		/**
		 * ```tree
		 * External $mol_link
		 * 	uri \http://example.org
		 * 	title \example.org
		 * 	hint <= external_hint @ \external link
		 * ```
		 */
		@ $mol_mem
		External() {
			const obj = new this.$.$mol_link()

			obj.uri = () => "http://example.org"
			obj.title = () => "example.org"
			obj.hint = () => this.external_hint()

			return obj
		}

		/**
		 * ```tree
		 * external_hint @ \external link
		 * ```
		 */
		external_hint() {
			return this.$.$mol_locale.text( '$mol_link_demo_external_hint' )
		}
	}

}
