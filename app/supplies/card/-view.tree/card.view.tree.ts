namespace $ {
	export class $mol_app_supplies_card extends $mol_link {
		
		/**
		 * ```tree
		 * supply null
		 * ```
		 */
		supply() {
			return null as any
		}
		
		/**
		 * ```tree
		 * minimal_height 125
		 * ```
		 */
		minimal_height() {
			return 125
		}
		
		/**
		 * ```tree
		 * sub / <= Card
		 * ```
		 */
		sub() {
			return [
				this.Card()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * status \
		 * ```
		 */
		status() {
			return ""
		}
		
		/**
		 * ```tree
		 * code_title \Code
		 * ```
		 */
		code_title() {
			return "Code"
		}
		
		/**
		 * ```tree
		 * code \
		 * ```
		 */
		code() {
			return ""
		}
		
		/**
		 * ```tree
		 * Code_item $mol_labeler
		 * 	title <= code_title
		 * 	content / <= code
		 * ```
		 */
		@ $mol_mem
		Code_item() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => this.code_title()
			obj.content = () => [
				this.code()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * cost_title \Cost
		 * ```
		 */
		cost_title() {
			return "Cost"
		}
		
		/**
		 * ```tree
		 * cost $mol_unit_money valueOf 0
		 * ```
		 */
		@ $mol_mem
		cost() {
			const obj = new this.$.$mol_unit_money()
			
			obj.valueOf = () => 0
			
			return obj
		}
		
		/**
		 * ```tree
		 * Cost $mol_cost value <= cost
		 * ```
		 */
		@ $mol_mem
		Cost() {
			const obj = new this.$.$mol_cost()
			
			obj.value = () => this.cost()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Cost_item $mol_labeler
		 * 	title <= cost_title
		 * 	content / <= Cost
		 * ```
		 */
		@ $mol_mem
		Cost_item() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => this.cost_title()
			obj.content = () => [
				this.Cost()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * provider_title \Provider
		 * ```
		 */
		provider_title() {
			return "Provider"
		}
		
		/**
		 * ```tree
		 * provider_name \
		 * ```
		 */
		provider_name() {
			return ""
		}
		
		/**
		 * ```tree
		 * Provider_item $mol_labeler
		 * 	title <= provider_title
		 * 	content / <= provider_name
		 * ```
		 */
		@ $mol_mem
		Provider_item() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => this.provider_title()
			obj.content = () => [
				this.provider_name()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * items /
		 * 	<= Code_item
		 * 	<= Cost_item
		 * 	<= Provider_item
		 * ```
		 */
		items() {
			return [
				this.Code_item(),
				this.Cost_item(),
				this.Provider_item()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Group $mol_row sub <= items
		 * ```
		 */
		@ $mol_mem
		Group() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => this.items()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Card $mol_card
		 * 	status <= status
		 * 	Content <= Group
		 * ```
		 */
		@ $mol_mem
		Card() {
			const obj = new this.$.$mol_card()
			
			obj.status = () => this.status()
			obj.Content = () => this.Group()
			
			return obj
		}
	}
	
}

