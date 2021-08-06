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
		 * greeterMessage @ \Hello, world!
		 * ```
		 */
		greeterMessage() {
			return this.$.$mol_locale.text( '$mol_deck_demo_greeterMessage' )
		}
		
		/**
		 * ```tree
		 * Greeter $mol_row
		 * 	title @ \Greeting
		 * 	sub / <= greeterMessage
		 * ```
		 */
		@ $mol_mem
		Greeter() {
			const obj = new this.$.$mol_row()
			
			obj.title = () => this.$.$mol_locale.text( '$mol_deck_demo_Greeter_title' )
			obj.sub = () => [
				this.greeterMessage()
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
		 * Quester $mol_row
		 * 	title @ \Question
		 * 	sub / <= questerMessage
		 * ```
		 */
		@ $mol_mem
		Quester() {
			const obj = new this.$.$mol_row()
			
			obj.title = () => this.$.$mol_locale.text( '$mol_deck_demo_Quester_title' )
			obj.sub = () => [
				this.questerMessage()
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
		
		/**
		 * ```tree
		 * Commander $mol_row
		 * 	title @ \Command
		 * 	sub / <= commanderMessage
		 * ```
		 */
		@ $mol_mem
		Commander() {
			const obj = new this.$.$mol_row()
			
			obj.title = () => this.$.$mol_locale.text( '$mol_deck_demo_Commander_title' )
			obj.sub = () => [
				this.commanderMessage()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Deck $mol_deck items /
		 * 	<= Greeter
		 * 	<= Quester
		 * 	<= Commander
		 * ```
		 */
		@ $mol_mem
		Deck() {
			const obj = new this.$.$mol_deck()
			
			obj.items = () => [
				this.Greeter(),
				this.Quester(),
				this.Commander()
			] as readonly any[]
			
			return obj
		}
	}
	
}

