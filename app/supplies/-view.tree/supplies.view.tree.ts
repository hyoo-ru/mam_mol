namespace $ { export class $mol_app_supplies extends $mol_book2 {

	/**
	 *  ```
	 *  attr *
	 *  	^
	 *  	mol_theme \$mol_theme_auto
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"mol_theme" :  "$mol_theme_auto" ,
		})
	}

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
		return [] as readonly ( $mol_app_supplies_domain_supply )[]
	}

	/**
	 *  ```
	 *  tools_root /
	 *  ```
	 **/
	tools_root() {
		return [] as readonly any[]
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
	 *  Detail!id $mol_app_supplies_detail
	 *  	minimal_width 800
	 *  	supply <= supply
	 *  ```
	 **/
	@ $mol_mem_key
	Detail( id : any ) {
		return (( obj )=>{
			obj.minimal_width = () => 800
			obj.supply = () => this.supply()
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
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/app/supplies/-view.tree/supplies.view.tree.map