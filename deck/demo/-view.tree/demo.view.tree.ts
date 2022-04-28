namespace $ {
	export class $mol_deck_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \Simple deck with tabbar
		 * ```
		 */
		title() {
			return "Simple deck with tabbar"
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
		 * greet_message \Hello, world!
		 * ```
		 */
		greet_message() {
			return "Hello, world!"
		}
		
		/**
		 * ```tree
		 * Greeter $mol_card
		 * 	title \Greeting
		 * 	content / <= greet_message
		 * ```
		 */
		@ $mol_mem
		Greeter() {
			const obj = new this.$.$mol_card()
			
			obj.title = () => "Greeting"
			obj.content = () => [
				this.greet_message()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * quest_message \How are you?
		 * ```
		 */
		quest_message() {
			return "How are you?"
		}
		
		/**
		 * ```tree
		 * Quester $mol_card
		 * 	title \Question
		 * 	content / <= quest_message
		 * ```
		 */
		@ $mol_mem
		Quester() {
			const obj = new this.$.$mol_card()
			
			obj.title = () => "Question"
			obj.content = () => [
				this.quest_message()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * command_message \Let us do it right!
		 * ```
		 */
		command_message() {
			return "Let us do it right!"
		}
		
		/**
		 * ```tree
		 * Commander $mol_card
		 * 	title \Command
		 * 	content / <= command_message
		 * ```
		 */
		@ $mol_mem
		Commander() {
			const obj = new this.$.$mol_card()
			
			obj.title = () => "Command"
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

