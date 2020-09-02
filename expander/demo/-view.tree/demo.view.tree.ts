namespace $ {
	export class $mol_expander_demo extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Simple spoiler
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_expander_demo_title' )
		}

		/**
		 * ```tree
		 * sub / <= Expander
		 * ```
		 */
		sub() {
			return [
				this.Expander()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Content $mol_filler
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_filler()

			return obj
		}

		/**
		 * ```tree
		 * Expander $mol_expander
		 * 	title \Lorem Ipsum
		 * 	Content <= Content
		 * ```
		 */
		@ $mol_mem
		Expander() {
			const obj = new this.$.$mol_expander()

			obj.title = () => "Lorem Ipsum"
			obj.Content = () => this.Content()

			return obj
		}
	}

}
