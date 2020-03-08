namespace $ { export class $mol_nav_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Number input control with various configuration
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_nav_demo_title" )
	}

	/**
	 *  ```
	 *  plugins / <= Nav
	 *  ```
	 **/
	plugins() {
		return [ this.Nav() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Nav $mol_nav
	 *  	keys_x <= tab_list
	 *  	current_x?val <=> tab_current?val
	 *  	keys_y <= row_list
	 *  	current_y?val <=> row_current?val
	 *  ```
	 **/
	@ $mol_mem
	Nav() {
		return (( obj )=>{
			obj.keys_x = () => this.tab_list()
			obj.current_x = ( val? : any ) => this.tab_current( val )
			obj.keys_y = () => this.row_list()
			obj.current_y = ( val? : any ) => this.row_current( val )
			return obj
		})( new this.$.$mol_nav(  ) )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Hint
	 *  	<= Tab_list
	 *  	<= Row_list
	 *  ```
	 **/
	sub() {
		return [ this.Hint() , this.Tab_list() , this.Row_list() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Hint $mol_view sub / <= hint
	 *  ```
	 **/
	@ $mol_mem
	Hint() {
		return (( obj )=>{
			obj.sub = () => [ this.hint() ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  hint @ \Select option and use keys to switch
	 *  ```
	 **/
	hint() {
		return this.$.$mol_locale.text( "$mol_nav_demo_hint" )
	}

	tab_list() {
		return this.Tab_list().keys(  )
	}

	/**
	 *  ```
	 *  Tab_list $mol_switch
	 *  	keys => tab_list
	 *  	value?val <=> tab_current?val
	 *  	options *
	 *  		first \First
	 *  		second \Second
	 *  		third \Third
	 *  ```
	 **/
	@ $mol_mem
	Tab_list() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.tab_current( val )
			obj.options = () => ({
			"first" :  "First" ,
			"second" :  "Second" ,
			"third" :  "Third" ,
		})
			return obj
		})( new this.$.$mol_switch(  ) )
	}

	/**
	 *  ```
	 *  tab_current?val \
	 *  ```
	 **/
	@ $mol_mem
	tab_current( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	row_list() {
		return this.Row_list().keys(  )
	}

	/**
	 *  ```
	 *  Row_list $mol_switch
	 *  	keys => row_list
	 *  	value?val <=> row_current?val
	 *  	options *
	 *  		first \First
	 *  		second \Second
	 *  		third \Third
	 *  ```
	 **/
	@ $mol_mem
	Row_list() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.row_current( val )
			obj.options = () => ({
			"first" :  "First" ,
			"second" :  "Second" ,
			"third" :  "Third" ,
		})
			return obj
		})( new this.$.$mol_switch(  ) )
	}

	/**
	 *  ```
	 *  row_current?val \
	 *  ```
	 **/
	@ $mol_mem
	row_current( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

} }

