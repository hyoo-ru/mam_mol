namespace $ { export class $mol_app_supplies_position extends $mol_card {

	/**
	 *  ```
	 *  minimal_height 70
	 *  ```
	 **/
	minimal_height() {
		return 70
	}

	/**
	 *  ```
	 *  position $mol_app_supplies_domain_supply_position
	 *  ```
	 **/
	@ $mol_mem
	position() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_app_supplies_domain_supply_position(  ) )
	}

	/**
	 *  ```
	 *  Content <= Row
	 *  ```
	 **/
	Content() {
		return this.Row()
	}

	/**
	 *  ```
	 *  Row $mol_view sub /
	 *  	<= Main_group
	 *  	<= Addon_group
	 *  	<= Supply_group
	 *  ```
	 **/
	@ $mol_mem
	Row() {
		return (( obj )=>{
			obj.sub = () => [this.Main_group() , this.Addon_group() , this.Supply_group()] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  Main_group $mol_row sub /
	 *  	<= Product_item
	 *  	<= Cost_item
	 *  ```
	 **/
	@ $mol_mem
	Main_group() {
		return (( obj )=>{
			obj.sub = () => [this.Product_item() , this.Cost_item()] as readonly any[]
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  Product_item $mol_labeler
	 *  	title <= product_title
	 *  	content / <= product_name
	 *  ```
	 **/
	@ $mol_mem
	Product_item() {
		return (( obj )=>{
			obj.title = () => this.product_title()
			obj.content = () => [this.product_name()] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  product_title @ \Product
	 *  ```
	 **/
	product_title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_position_product_title" )
	}

	/**
	 *  ```
	 *  product_name \
	 *  ```
	 **/
	product_name() {
		return ""
	}

	/**
	 *  ```
	 *  Cost_item $mol_labeler
	 *  	title <= cost_title
	 *  	content / <= Cost
	 *  ```
	 **/
	@ $mol_mem
	Cost_item() {
		return (( obj )=>{
			obj.title = () => this.cost_title()
			obj.content = () => [this.Cost()] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  cost_title @ \Cost
	 *  ```
	 **/
	cost_title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_position_cost_title" )
	}

	/**
	 *  ```
	 *  Cost $mol_cost value <= cost
	 *  ```
	 **/
	@ $mol_mem
	Cost() {
		return (( obj )=>{
			obj.value = () => this.cost()
			return obj
		})( new this.$.$mol_cost(  ) )
	}

	/**
	 *  ```
	 *  cost $mol_unit_money valueOf 0
	 *  ```
	 **/
	@ $mol_mem
	cost() {
		return (( obj )=>{
			obj.valueOf = () => 0
			return obj
		})( new this.$.$mol_unit_money(  ) )
	}

	/**
	 *  ```
	 *  Addon_group $mol_row sub /
	 *  	<= Division_item
	 *  	<= Price_item
	 *  ```
	 **/
	@ $mol_mem
	Addon_group() {
		return (( obj )=>{
			obj.sub = () => [this.Division_item() , this.Price_item()] as readonly any[]
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  Division_item $mol_labeler
	 *  	title <= division_title
	 *  	content / <= division_name
	 *  ```
	 **/
	@ $mol_mem
	Division_item() {
		return (( obj )=>{
			obj.title = () => this.division_title()
			obj.content = () => [this.division_name()] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  division_title @ \Division
	 *  ```
	 **/
	division_title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_position_division_title" )
	}

	/**
	 *  ```
	 *  division_name \
	 *  ```
	 **/
	division_name() {
		return ""
	}

	/**
	 *  ```
	 *  Price_item $mol_labeler
	 *  	title <= price_label
	 *  	content / <= Price
	 *  ```
	 **/
	@ $mol_mem
	Price_item() {
		return (( obj )=>{
			obj.title = () => this.price_label()
			obj.content = () => [this.Price()] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  price_label @ \Price
	 *  ```
	 **/
	price_label() {
		return this.$.$mol_locale.text( "$mol_app_supplies_position_price_label" )
	}

	/**
	 *  ```
	 *  Price $mol_cost value <= price
	 *  ```
	 **/
	@ $mol_mem
	Price() {
		return (( obj )=>{
			obj.value = () => this.price()
			return obj
		})( new this.$.$mol_cost(  ) )
	}

	/**
	 *  ```
	 *  price $mol_unit_money valueOf 0
	 *  ```
	 **/
	@ $mol_mem
	price() {
		return (( obj )=>{
			obj.valueOf = () => 0
			return obj
		})( new this.$.$mol_unit_money(  ) )
	}

	/**
	 *  ```
	 *  Supply_group $mol_row sub /
	 *  	<= Quantity_item
	 *  	<= Supply_date_item
	 *  	<= Store_item
	 *  ```
	 **/
	@ $mol_mem
	Supply_group() {
		return (( obj )=>{
			obj.sub = () => [this.Quantity_item() , this.Supply_date_item() , this.Store_item()] as readonly any[]
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  Quantity_item $mol_labeler
	 *  	title <= quantity_title
	 *  	content / <= quantity
	 *  ```
	 **/
	@ $mol_mem
	Quantity_item() {
		return (( obj )=>{
			obj.title = () => this.quantity_title()
			obj.content = () => [this.quantity()] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  quantity_title @ \Quantity
	 *  ```
	 **/
	quantity_title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_position_quantity_title" )
	}

	/**
	 *  ```
	 *  quantity \
	 *  ```
	 **/
	quantity() {
		return ""
	}

	/**
	 *  ```
	 *  Supply_date_item $mol_labeler
	 *  	title <= supply_date_title
	 *  	content / <= supply_date
	 *  ```
	 **/
	@ $mol_mem
	Supply_date_item() {
		return (( obj )=>{
			obj.title = () => this.supply_date_title()
			obj.content = () => [this.supply_date()] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  supply_date_title @ \Supply date
	 *  ```
	 **/
	supply_date_title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_position_supply_date_title" )
	}

	/**
	 *  ```
	 *  supply_date \
	 *  ```
	 **/
	supply_date() {
		return ""
	}

	/**
	 *  ```
	 *  Store_item $mol_labeler
	 *  	title <= store_title
	 *  	content / <= store_name
	 *  ```
	 **/
	@ $mol_mem
	Store_item() {
		return (( obj )=>{
			obj.title = () => this.store_title()
			obj.content = () => [this.store_name()] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  store_title @ \Store
	 *  ```
	 **/
	store_title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_position_store_title" )
	}

	/**
	 *  ```
	 *  store_name \
	 *  ```
	 **/
	store_name() {
		return ""
	}

} }
