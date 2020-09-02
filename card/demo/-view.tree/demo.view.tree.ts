namespace $ {
	export class $mol_card_demo extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Cards with optional status
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_card_demo_title' )
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Simple
		 * 	<= Pending
		 * ```
		 */
		sub() {
			return [
				this.Simple(),
				this.Pending()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Simple_content $mol_row sub / \Hello world!
		 * ```
		 */
		@ $mol_mem
		Simple_content() {
			const obj = new this.$.$mol_row()

			obj.sub = () => [
				"Hello world!"
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Simple $mol_card Content <= Simple_content
		 * ```
		 */
		@ $mol_mem
		Simple() {
			const obj = new this.$.$mol_card()

			obj.Content = () => this.Simple_content()

			return obj
		}

		/**
		 * ```tree
		 * Pending_content $mol_row sub / \Hello pending!
		 * ```
		 */
		@ $mol_mem
		Pending_content() {
			const obj = new this.$.$mol_row()

			obj.sub = () => [
				"Hello pending!"
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Pending $mol_card
		 * 	Content <= Pending_content
		 * 	status \pending
		 * ```
		 */
		@ $mol_mem
		Pending() {
			const obj = new this.$.$mol_card()

			obj.Content = () => this.Pending_content()
			obj.status = () => "pending"

			return obj
		}
	}

}
