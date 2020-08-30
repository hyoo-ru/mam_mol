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
		 * sub / <= Deck $mol_deck items /
		 * 	<= greeterItem *
		 * 		title <= greeterLabel @ \Greeting
		 * 		Content <= greeterContent $mol_row sub / <= greeterMessager $mol_view sub / <= greeterMessage @ \Hello, world!
		 * 	<= questerItem *
		 * 		title <= questerLabel @ \Question
		 * 		Content <= questerContent $mol_row sub / <= questerMessager $mol_view sub / <= questerMessage @ \How are you?
		 * 	<= commanderItem *
		 * 		title <= commanderLabel @ \Command
		 * 		Content <= commanderContent $mol_row sub / <= commanderMessager $mol_view sub / <= commanderMessage @ \Let us do it right!
		 * ```
		 */
		sub() {
			return [
				this.Deck()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Deck $mol_deck items /
		 * 	<= greeterItem *
		 * 		title <= greeterLabel @ \Greeting
		 * 		Content <= greeterContent $mol_row sub / <= greeterMessager $mol_view sub / <= greeterMessage @ \Hello, world!
		 * 	<= questerItem *
		 * 		title <= questerLabel @ \Question
		 * 		Content <= questerContent $mol_row sub / <= questerMessager $mol_view sub / <= questerMessage @ \How are you?
		 * 	<= commanderItem *
		 * 		title <= commanderLabel @ \Command
		 * 		Content <= commanderContent $mol_row sub / <= commanderMessager $mol_view sub / <= commanderMessage @ \Let us do it right!
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

		/**
		 * ```tree
		 * greeterItem *
		 * 	title <= greeterLabel @ \Greeting
		 * 	Content <= greeterContent $mol_row sub / <= greeterMessager $mol_view sub / <= greeterMessage @ \Hello, world!
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
		 * greeterLabel @ \Greeting
		 * ```
		 */
		greeterLabel() {
			return this.$.$mol_locale.text( '$mol_deck_demo_greeterLabel' )
		}

		/**
		 * ```tree
		 * greeterContent $mol_row sub / <= greeterMessager $mol_view sub / <= greeterMessage @ \Hello, world!
		 * ```
		 */
		@ $mol_mem
		greeterContent() {
			const obj = new this.$.$mol_row()

			obj.sub = () => [
				this.greeterMessager()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * greeterMessager $mol_view sub / <= greeterMessage @ \Hello, world!
		 * ```
		 */
		@ $mol_mem
		greeterMessager() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.greeterMessage()
			] as readonly any[]

			return obj
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
		 * questerItem *
		 * 	title <= questerLabel @ \Question
		 * 	Content <= questerContent $mol_row sub / <= questerMessager $mol_view sub / <= questerMessage @ \How are you?
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
		 * questerLabel @ \Question
		 * ```
		 */
		questerLabel() {
			return this.$.$mol_locale.text( '$mol_deck_demo_questerLabel' )
		}

		/**
		 * ```tree
		 * questerContent $mol_row sub / <= questerMessager $mol_view sub / <= questerMessage @ \How are you?
		 * ```
		 */
		@ $mol_mem
		questerContent() {
			const obj = new this.$.$mol_row()

			obj.sub = () => [
				this.questerMessager()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * questerMessager $mol_view sub / <= questerMessage @ \How are you?
		 * ```
		 */
		@ $mol_mem
		questerMessager() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.questerMessage()
			] as readonly any[]

			return obj
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
		 * commanderItem *
		 * 	title <= commanderLabel @ \Command
		 * 	Content <= commanderContent $mol_row sub / <= commanderMessager $mol_view sub / <= commanderMessage @ \Let us do it right!
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
		 * commanderLabel @ \Command
		 * ```
		 */
		commanderLabel() {
			return this.$.$mol_locale.text( '$mol_deck_demo_commanderLabel' )
		}

		/**
		 * ```tree
		 * commanderContent $mol_row sub / <= commanderMessager $mol_view sub / <= commanderMessage @ \Let us do it right!
		 * ```
		 */
		@ $mol_mem
		commanderContent() {
			const obj = new this.$.$mol_row()

			obj.sub = () => [
				this.commanderMessager()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * commanderMessager $mol_view sub / <= commanderMessage @ \Let us do it right!
		 * ```
		 */
		@ $mol_mem
		commanderMessager() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.commanderMessage()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * commanderMessage @ \Let us do it right!
		 * ```
		 */
		commanderMessage() {
			return this.$.$mol_locale.text( '$mol_deck_demo_commanderMessage' )
		}
	}

}
