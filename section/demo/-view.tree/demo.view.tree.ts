namespace $ {
	export class $mol_section_demo extends $mol_demo_large {

		/**
		 * ```tree
		 * title @ \Section with header
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_section_demo_title' )
		}

		/**
		 * ```tree
		 * sub / <= Text
		 * ```
		 */
		sub() {
			return [
				this.Text()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Section_content $mol_filler
		 * ```
		 */
		@ $mol_mem
		Section_content() {
			const obj = new this.$.$mol_filler()

			return obj
		}

		/**
		 * ```tree
		 * Section $mol_section
		 * 	head / \Section header
		 * 	Content <= Section_content
		 * ```
		 */
		@ $mol_mem
		Section() {
			const obj = new this.$.$mol_section()

			obj.head = () => [
				"Section header"
			] as readonly any[]
			obj.Content = () => this.Section_content()

			return obj
		}

		/**
		 * ```tree
		 * Text $mol_row sub / <= Section
		 * ```
		 */
		@ $mol_mem
		Text() {
			const obj = new this.$.$mol_row()

			obj.sub = () => [
				this.Section()
			] as readonly any[]

			return obj
		}
	}

}
