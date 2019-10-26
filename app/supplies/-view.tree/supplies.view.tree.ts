namespace $ { export class $mol_app_supplies extends $mol_book {

	/**
	 *  ```
	 *  enter $mol_app_supplies_enter entered?val <=> entered?val
	 *  ```
	 **/
	@ $mol_mem
	enter() {
		return (( obj )=>{
			obj.entered = ( val? : any ) => this.entered( val )
			return obj
		})( new this.$.$mol_app_supplies_enter(  ) )
	}

	/**
	 *  ```
	 *  entered?val false
	 *  ```
	 **/
	@ $mol_mem
	entered( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/**
	 *  ```
	 *  List $mol_app_supplies_list
	 *  	minimal_width 600
	 *  	supplies <= supplies
	 *  	tools <= tools_root
	 *  	title <= list_title
	 *  	search_query?val <=> supply_id?val
	 *  ```
	 **/
	@ $mol_mem
	List() {
		return (( obj )=>{
			obj.minimal_width = () => 600
			obj.supplies = () => this.supplies()
			obj.tools = () => this.tools_root()
			obj.title = () => this.list_title()
			obj.search_query = ( val? : any ) => this.supply_id( val )
			return obj
		})( new this.$.$mol_app_supplies_list(  ) )
	}

	/**
	 *  ```
	 *  supplies /$mol_app_supplies_domain_supply
	 *  ```
	 **/
	supplies() {
		return [  ] as readonly ( $mol_app_supplies_domain_supply )[]
	}

	/**
	 *  ```
	 *  tools_root /
	 *  ```
	 **/
	tools_root() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  list_title @ \Supplies
	 *  ```
	 **/
	list_title() {
		return this.$.$mol_locale.text( "$mol_app_supplies_list_title" )
	}

	/**
	 *  ```
	 *  supply_id?val \
	 *  ```
	 **/
	@ $mol_mem
	supply_id( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Detail $mol_app_supplies_detail
	 *  	minimal_width 800
	 *  	supply <= supply
	 *  	event_top?val <=> event_front_up?val
	 *  ```
	 **/
	@ $mol_mem
	Detail() {
		return (( obj )=>{
			obj.minimal_width = () => 800
			obj.supply = () => this.supply()
			obj.event_top = ( val? : any ) => this.event_front_up( val )
			return obj
		})( new this.$.$mol_app_supplies_detail(  ) )
	}

	/**
	 *  ```
	 *  supply null
	 *  ```
	 **/
	supply() {
		return null as any
	}

} }

