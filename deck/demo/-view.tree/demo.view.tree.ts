namespace $ {
	export class $mol_deck_demo extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Simple deck with tabbar
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_deck_demo_title' )
		}

		/**
		 * ```tree
		 * sub / <= Deck
		 * ```
		 */
		sub() {
			return [
				this.Deck()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * greeterLabel @ \Greeting
		 * ```
		 */
		greeterLabel() {
			return this.$.$mol_locale.text( '$mol_deck_demo_greeterLabel' )
		}

		/**
		 * ```tree
		 * greeterMessage @ \Hello, world!
		 * ```
		 */
		greeterMessage() {
			return this.$.$mol_locale.text( '$mol_deck_demo_greeterMessage' )
		}

		/**
		 * ```tree
		 * greeterContent $mol_row sub / <= greeterMessage
		 * ```
		 */
		@ $mol_mem
		greeterContent() {
			const obj = new this.$.$mol_row()

			obj.sub = () => [
				this.greeterMessage()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * greeterItem *
		 * 	title <= greeterLabel
		 * 	Content <= greeterContent
		 * ```
		 */
		greeterItem() {
			return {
				title: this.greeterLabel(),
				Content: this.greeterContent()
			}
		}

		/**
		 * ```tree
		 * questerLabel @ \Question
		 * ```
		 */
		questerLabel() {
			return this.$.$mol_locale.text( '$mol_deck_demo_questerLabel' )
		}

		/**
		 * ```tree
		 * questerMessage @ \How are you?
		 * ```
		 */
		questerMessage() {
			return this.$.$mol_locale.text( '$mol_deck_demo_questerMessage' )
		}

		/**
		 * ```tree
		 * questerContent $mol_row sub / <= questerMessage
		 * ```
		 */
		@ $mol_mem
		questerContent() {
			const obj = new this.$.$mol_row()

			obj.sub = () => [
				this.questerMessage()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * questerItem *
		 * 	title <= questerLabel
		 * 	Content <= questerContent
		 * ```
		 */
		questerItem() {
			return {
				title: this.questerLabel(),
				Content: this.questerContent()
			}
		}

		/**
		 * ```tree
		 * commanderLabel @ \Command
		 * ```
		 */
		commanderLabel() {
			return this.$.$mol_locale.text( '$mol_deck_demo_commanderLabel' )
		}

		/**
		 * ```tree
		 * commanderMessage @ \Let us do it right!
		 * ```
		 */
		commanderMessage() {
			return this.$.$mol_locale.text( '$mol_deck_demo_commanderMessage' )
		}

		/**
		 * ```tree
		 * commanderContent $mol_row sub / <= commanderMessage
		 * ```
		 */
		@ $mol_mem
		commanderContent() {
			const obj = new this.$.$mol_row()

			obj.sub = () => [
				this.commanderMessage()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * commanderItem *
		 * 	title <= commanderLabel
		 * 	Content <= commanderContent
		 * ```
		 */
		commanderItem() {
			return {
				title: this.commanderLabel(),
				Content: this.commanderContent()
			}
		}

		/**
		 * ```tree
		 * Deck $mol_deck items /
		 * 	<= greeterItem
		 * 	<= questerItem
		 * 	<= commanderItem
		 * ```
		 */
		@ $mol_mem
		Deck() {
			const obj = new this.$.$mol_deck()

			obj.items = () => [
				this.greeterItem(),
				this.questerItem(),
				this.commanderItem()
			] as readonly any[]

			return obj
		}
	}

}
