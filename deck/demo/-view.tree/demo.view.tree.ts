namespace $ {
	export class $mol_deck_demo extends $mol_demo {
		
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
		 * tags /
		 * 	\$mol_card
		 * 	\deck
		 * 	\card
		 * 	\tabs
		 * 	\container
		 * ```
		 */
		tags() {
			return [
				"$mol_card",
				"deck",
				"card",
				"tabs",
				"container"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * greet_message @ \Hello, world!
		 * ```
		 */
		greet_message() {
			return this.$.$mol_locale.text( '$mol_deck_demo_greet_message' )
		}
		
		/**
		 * ```tree
		 * Greeter $mol_card
		 * 	title @ \Greeting
		 * 	content / <= greet_message
		 * ```
		 */
		@ $mol_mem
		Greeter() {
			const obj = new this.$.$mol_card()
			
			obj.title = () => this.$.$mol_locale.text( '$mol_deck_demo_Greeter_title' )
			obj.content = () => [
				this.greet_message()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * quest_message @ \How are you?
		 * ```
		 */
		quest_message() {
			return this.$.$mol_locale.text( '$mol_deck_demo_quest_message' )
		}
		
		/**
		 * ```tree
		 * Quester $mol_card
		 * 	title @ \Question
		 * 	content / <= quest_message
		 * ```
		 */
		@ $mol_mem
		Quester() {
			const obj = new this.$.$mol_card()
			
			obj.title = () => this.$.$mol_locale.text( '$mol_deck_demo_Quester_title' )
			obj.content = () => [
				this.quest_message()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * command_message @ \Let us do it right!
		 * ```
		 */
		command_message() {
			return this.$.$mol_locale.text( '$mol_deck_demo_command_message' )
		}
		
		/**
		 * ```tree
		 * Commander $mol_card
		 * 	title @ \Command
		 * 	content / <= command_message
		 * ```
		 */
		@ $mol_mem
		Commander() {
			const obj = new this.$.$mol_card()
			
			obj.title = () => this.$.$mol_locale.text( '$mol_deck_demo_Commander_title' )
			obj.content = () => [
				this.command_message()
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

