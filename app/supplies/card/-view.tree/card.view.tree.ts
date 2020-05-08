namespace $ { export class $mol_app_supplies_card extends $mol_link {

	/**
	 *  ```
	 *  supply null
	 *  ```
	 **/
	supply() {
		return null as any
	}

	/**
	 *  ```
	 *  minimal_height 125
	 *  ```
	 **/
	minimal_height() {
		return 125
	}

	/**
	 *  ```
	 *  sub / <= Card
	 *  ```
	 **/
	sub() {
		return [this.Card()] as readonly any[]
	}

	/**
	 *  ```
	 *  Card $mol_card
	 *  	status <= status
	 *  	Content <= Group
	 *  ```
	 **/
	@ $mol_mem
	Card() {
		return (( obj )=>{
			obj.status = () => this.status()
			obj.Content = () => this.Group()
			return obj
		})( new this.$.$mol_card(  ) )
	}

	/**
	 *  ```
	 *  status \
	 *  ```
	 **/
	status() {
		return ""
	}

	/**
	 *  ```
	 *  Group $mol_row sub <= items
	 *  ```
	 **/
	@ $mol_mem
	Group() {
		return (( obj )=>{
			obj.sub = () => this.items()
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  items /
	 *  	<= Code_item
	 *  	<= Cost_item
	 *  	<= Provider_item
	 *  ```
	 **/
	items() {
		return [this.Code_item() , this.Cost_item() , this.Provider_item()] as readonly any[]
	}

	/**
	 *  ```
	 *  Code_item $mol_labeler
	 *  	title <= code_title
	 *  	content / <= code
	 *  ```
	 **/
	@ $mol_mem
	Code_item() {
		return (( obj )=>{
			obj.title = () => this.code_title()
			obj.content = () => [this.code()] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  code_title @ \Code
	 *  ```
	 **/
	code_title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_card_code_title" )
	}

	/**
	 *  ```
	 *  code \
	 *  ```
	 **/
	code() {
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
		return this.$.$mol_locale.text( "$mol_app_supplies_card_cost_title" )
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
	 *  Provider_item $mol_labeler
	 *  	title <= provider_title
	 *  	content / <= provider_name
	 *  ```
	 **/
	@ $mol_mem
	Provider_item() {
		return (( obj )=>{
			obj.title = () => this.provider_title()
			obj.content = () => [this.provider_name()] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  provider_title @ \Provider
	 *  ```
	 **/
	provider_title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_card_provider_title" )
	}

	/**
	 *  ```
	 *  provider_name \
	 *  ```
	 **/
	provider_name() {
		return ""
	}

} }
