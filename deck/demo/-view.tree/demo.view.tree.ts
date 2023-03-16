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
		 * Greeting $mol_card
		 * 	title \Greeting
		 * 	content / \Hello, world!
		 * ```
		 */
		@ $mol_mem
		Greeting() {
			const obj = new this.$.$mol_card()
			
			obj.title = () => "Greeting"
			obj.content = () => [
				"Hello, world!"
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Question $mol_card
		 * 	title \Question
		 * 	content / \How are you?
		 * ```
		 */
		@ $mol_mem
		Question() {
			const obj = new this.$.$mol_card()
			
			obj.title = () => "Question"
			obj.content = () => [
				"How are you?"
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Answer $mol_card
		 * 	title \Answer
		 * 	content / \The Answer to the Ultimate Question of Life, the Universe, and Everything is 42
		 * ```
		 */
		@ $mol_mem
		Answer() {
			const obj = new this.$.$mol_card()
			
			obj.title = () => "Answer"
			obj.content = () => [
				"The Answer to the Ultimate Question of Life, the Universe, and Everything is 42"
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Command $mol_card
		 * 	title \Command
		 * 	content / \Let's do it right!
		 * ```
		 */
		@ $mol_mem
		Command() {
			const obj = new this.$.$mol_card()
			
			obj.title = () => "Command"
			obj.content = () => [
				"Let's do it right!"
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Spam_content $mol_filler
		 * ```
		 */
		@ $mol_mem
		Spam_content() {
			const obj = new this.$.$mol_filler()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Spam $mol_card
		 * 	title \Spam
		 * 	Content <= Spam_content
		 * ```
		 */
		@ $mol_mem
		Spam() {
			const obj = new this.$.$mol_card()
			
			obj.title = () => "Spam"
			obj.Content = () => this.Spam_content()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Deck $mol_deck items /
		 * 	<= Greeting
		 * 	<= Question
		 * 	<= Answer
		 * 	<= Command
		 * 	<= Spam
		 * ```
		 */
		@ $mol_mem
		Deck() {
			const obj = new this.$.$mol_deck()
			
			obj.items = () => [
				this.Greeting(),
				this.Question(),
				this.Answer(),
				this.Command(),
				this.Spam()
			] as readonly any[]
			
			return obj
		}
	}
	
}

