namespace $ {
	export class $mol_page_demo extends $mol_demo_large {

		/**
		 * ```tree
		 * title @ \Page with header, body and footer
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_page_demo_title' )
		}

		/**
		 * ```tree
		 * sub / <= Page
		 * ```
		 */
		sub() {
			return [
				this.Page()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Button $mol_button_minor title \Toolbar Button
		 * ```
		 */
		@ $mol_mem
		Button() {
			const obj = new this.$.$mol_button_minor()

			obj.title = () => "Toolbar Button"

			return obj
		}

		/**
		 * ```tree
		 * Text $mol_filler
		 * ```
		 */
		@ $mol_mem
		Text() {
			const obj = new this.$.$mol_filler()

			return obj
		}

		/**
		 * ```tree
		 * Content $mol_row sub / <= Text
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_row()

			obj.sub = () => [
				this.Text()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Foot_text $mol_view sub / \Footer
		 * ```
		 */
		@ $mol_mem
		Foot_text() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				"Footer"
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Foot_content $mol_row sub / <= Foot_text
		 * ```
		 */
		@ $mol_mem
		Foot_content() {
			const obj = new this.$.$mol_row()

			obj.sub = () => [
				this.Foot_text()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Page $mol_page
		 * 	tools / <= Button
		 * 	body / <= Content
		 * 	foot / <= Foot_content
		 * ```
		 */
		@ $mol_mem
		Page() {
			const obj = new this.$.$mol_page()

			obj.tools = () => [
				this.Button()
			] as readonly any[]
			obj.body = () => [
				this.Content()
			] as readonly any[]
			obj.foot = () => [
				this.Foot_content()
			] as readonly any[]

			return obj
		}
	}

}
