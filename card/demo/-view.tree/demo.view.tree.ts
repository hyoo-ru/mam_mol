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
		 * Simple $mol_card content / \Hello world!
		 * ```
		 */
		@ $mol_mem
		Simple() {
			const obj = new this.$.$mol_card()
			
			obj.content = () => [
				"Hello world!"
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Pending $mol_card
		 * 	title \Hello pending!
		 * 	status \pending
		 * ```
		 */
		@ $mol_mem
		Pending() {
			const obj = new this.$.$mol_card()
			
			obj.title = () => "Hello pending!"
			obj.status = () => "pending"
			
			return obj
		}
	}
	
}

