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
		 * sub / <= Card $mol_card
		 * 	status <= status \
		 * 	Content <= Group $mol_row sub <= items /
		 * 		<= Code_item $mol_labeler
		 * 			title <= code_title @ \Code
		 * 			content / <= code \
		 * 		<= Cost_item $mol_labeler
		 * 			title <= cost_title @ \Cost
		 * 			content / <= Cost $mol_cost value <= cost $mol_unit_money valueOf 0
		 * 		<= Provider_item $mol_labeler
		 * 			title <= provider_title @ \Provider
		 * 			content / <= provider_name \
		 * ```
		 */
		sub() {
			return [
				this.Card()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Card $mol_card
		 * 	status <= status \
		 * 	Content <= Group $mol_row sub <= items /
		 * 		<= Code_item $mol_labeler
		 * 			title <= code_title @ \Code
		 * 			content / <= code \
		 * 		<= Cost_item $mol_labeler
		 * 			title <= cost_title @ \Cost
		 * 			content / <= Cost $mol_cost value <= cost $mol_unit_money valueOf 0
		 * 		<= Provider_item $mol_labeler
		 * 			title <= provider_title @ \Provider
		 * 			content / <= provider_name \
		 * ```
		 */
		@ $mol_mem
		Card() {
			const obj = new this.$.$mol_card()

			obj.status = () => this.status()
			obj.Content = () => this.Group()

			return obj
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
		 * Group $mol_row sub <= items /
		 * 	<= Code_item $mol_labeler
		 * 		title <= code_title @ \Code
		 * 		content / <= code \
		 * 	<= Cost_item $mol_labeler
		 * 		title <= cost_title @ \Cost
		 * 		content / <= Cost $mol_cost value <= cost $mol_unit_money valueOf 0
		 * 	<= Provider_item $mol_labeler
		 * 		title <= provider_title @ \Provider
		 * 		content / <= provider_name \
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
		 * items /
		 * 	<= Code_item $mol_labeler
		 * 		title <= code_title @ \Code
		 * 		content / <= code \
		 * 	<= Cost_item $mol_labeler
		 * 		title <= cost_title @ \Cost
		 * 		content / <= Cost $mol_cost value <= cost $mol_unit_money valueOf 0
		 * 	<= Provider_item $mol_labeler
		 * 		title <= provider_title @ \Provider
		 * 		content / <= provider_name \
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
		 * Code_item $mol_labeler
		 * 	title <= code_title @ \Code
		 * 	content / <= code \
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
		 * code_title @ \Code
		 * ```
		 */
		code_title() {
			return this.$.$mol_locale.text( '$mol_app_supplies_card_code_title' )
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
		 * Cost_item $mol_labeler
		 * 	title <= cost_title @ \Cost
		 * 	content / <= Cost $mol_cost value <= cost $mol_unit_money valueOf 0
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
		 * cost_title @ \Cost
		 * ```
		 */
		cost_title() {
			return this.$.$mol_locale.text( '$mol_app_supplies_card_cost_title' )
		}

		/**
		 * ```tree
		 * Cost $mol_cost value <= cost $mol_unit_money valueOf 0
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
		 * Provider_item $mol_labeler
		 * 	title <= provider_title @ \Provider
		 * 	content / <= provider_name \
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
		 * provider_title @ \Provider
		 * ```
		 */
		provider_title() {
			return this.$.$mol_locale.text( '$mol_app_supplies_card_provider_title' )
		}

		/**
		 * ```tree
		 * provider_name \
		 * ```
		 */
		provider_name() {
			return ""
		}
	}

}
