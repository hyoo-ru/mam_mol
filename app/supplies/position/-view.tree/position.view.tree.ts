namespace $ {
	export class $mol_app_supplies_position extends $mol_card {
		
		/**
		 * ```tree
		 * minimal_height 64
		 * ```
		 */
		minimal_height() {
			return 64
		}
		
		/**
		 * ```tree
		 * position $mol_app_supplies_domain_supply_position
		 * ```
		 */
		@ $mol_mem
		position() {
			const obj = new this.$.$mol_app_supplies_domain_supply_position()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Content <= Row
		 * ```
		 */
		Content() {
			return this.Row()
		}
		
		/**
		 * ```tree
		 * product_title \Product
		 * ```
		 */
		product_title() {
			return "Product"
		}
		
		/**
		 * ```tree
		 * product_name \
		 * ```
		 */
		product_name() {
			return ""
		}
		
		/**
		 * ```tree
		 * Product_item $mol_labeler
		 * 	title <= product_title
		 * 	content / <= product_name
		 * ```
		 */
		@ $mol_mem
		Product_item() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => this.product_title()
			obj.content = () => [
				this.product_name()
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
		 * Main_group $mol_row sub /
		 * 	<= Product_item
		 * 	<= Cost_item
		 * ```
		 */
		@ $mol_mem
		Main_group() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Product_item(),
				this.Cost_item()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * division_title \Division
		 * ```
		 */
		division_title() {
			return "Division"
		}
		
		/**
		 * ```tree
		 * division_name \
		 * ```
		 */
		division_name() {
			return ""
		}
		
		/**
		 * ```tree
		 * Division_item $mol_labeler
		 * 	title <= division_title
		 * 	content / <= division_name
		 * ```
		 */
		@ $mol_mem
		Division_item() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => this.division_title()
			obj.content = () => [
				this.division_name()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * price_label \Price
		 * ```
		 */
		price_label() {
			return "Price"
		}
		
		/**
		 * ```tree
		 * price $mol_unit_money valueOf 0
		 * ```
		 */
		@ $mol_mem
		price() {
			const obj = new this.$.$mol_unit_money()
			
			obj.valueOf = () => 0
			
			return obj
		}
		
		/**
		 * ```tree
		 * Price $mol_cost value <= price
		 * ```
		 */
		@ $mol_mem
		Price() {
			const obj = new this.$.$mol_cost()
			
			obj.value = () => this.price()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Price_item $mol_labeler
		 * 	title <= price_label
		 * 	content / <= Price
		 * ```
		 */
		@ $mol_mem
		Price_item() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => this.price_label()
			obj.content = () => [
				this.Price()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Addon_group $mol_row sub /
		 * 	<= Division_item
		 * 	<= Price_item
		 * ```
		 */
		@ $mol_mem
		Addon_group() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Division_item(),
				this.Price_item()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * quantity_title \Quantity
		 * ```
		 */
		quantity_title() {
			return "Quantity"
		}
		
		/**
		 * ```tree
		 * quantity \
		 * ```
		 */
		quantity() {
			return ""
		}
		
		/**
		 * ```tree
		 * Quantity_item $mol_labeler
		 * 	title <= quantity_title
		 * 	content / <= quantity
		 * ```
		 */
		@ $mol_mem
		Quantity_item() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => this.quantity_title()
			obj.content = () => [
				this.quantity()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * supply_date_title \Supply date
		 * ```
		 */
		supply_date_title() {
			return "Supply date"
		}
		
		/**
		 * ```tree
		 * supply_date \
		 * ```
		 */
		supply_date() {
			return ""
		}
		
		/**
		 * ```tree
		 * Supply_date_item $mol_labeler
		 * 	title <= supply_date_title
		 * 	content / <= supply_date
		 * ```
		 */
		@ $mol_mem
		Supply_date_item() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => this.supply_date_title()
			obj.content = () => [
				this.supply_date()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * store_title \Store
		 * ```
		 */
		store_title() {
			return "Store"
		}
		
		/**
		 * ```tree
		 * store_name \
		 * ```
		 */
		store_name() {
			return ""
		}
		
		/**
		 * ```tree
		 * Store_item $mol_labeler
		 * 	title <= store_title
		 * 	content / <= store_name
		 * ```
		 */
		@ $mol_mem
		Store_item() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => this.store_title()
			obj.content = () => [
				this.store_name()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Supply_group $mol_row sub /
		 * 	<= Quantity_item
		 * 	<= Supply_date_item
		 * 	<= Store_item
		 * ```
		 */
		@ $mol_mem
		Supply_group() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Quantity_item(),
				this.Supply_date_item(),
				this.Store_item()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Row $mol_view sub /
		 * 	<= Main_group
		 * 	<= Addon_group
		 * 	<= Supply_group
		 * ```
		 */
		@ $mol_mem
		Row() {
			const obj = new this.$.$mol_view()
			
			obj.sub = () => [
				this.Main_group(),
				this.Addon_group(),
				this.Supply_group()
			] as readonly any[]
			
			return obj
		}
	}
	
}

