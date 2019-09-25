namespace $ { export class $mol_app_portal extends $mol_book {

	/**
	 *  ```
	 *  Menu $mol_page
	 *  	event_top?val <=> event_front_up?val
	 *  	tools <= tools_root
	 *  	title <= menu_title
	 *  	minimal_width 200
	 *  	body /
	 *  		<= Habhub_link
	 *  		<= Files_link
	 *  		<= Supplies_link
	 *  ```
	 **/
	@ $mol_mem
	Menu() {
		return (( obj )=>{
			obj.event_top = ( val? : any ) => this.event_front_up( val )
			obj.tools = () => this.tools_root()
			obj.title = () => this.menu_title()
			obj.minimal_width = () => 200
			obj.body = () => [].concat( this.Habhub_link() , this.Files_link() , this.Supplies_link() )
			return obj
		})( new this.$.$mol_page(  ) )
	}

	/**
	 *  ```
	 *  tools_root / <= Sources
	 *  ```
	 **/
	tools_root() {
		return [].concat( this.Sources() )
	}

	/**
	 *  ```
	 *  Sources $mol_link_iconed
	 *  	title \
	 *  	uri \https://github.com/eigenmethod/mol/tree/master/app/portal
	 *  ```
	 **/
	@ $mol_mem
	Sources() {
		return (( obj )=>{
			obj.title = () => ""
			obj.uri = () => "https://github.com/eigenmethod/mol/tree/master/app/portal"
			return obj
		})( new this.$.$mol_link_iconed(  ) )
	}

	/**
	 *  ```
	 *  menu_title @ \My portal
	 *  ```
	 **/
	menu_title() {
		return this.$.$mol_locale.text( "$mol_app_portal_menu_title" )
	}

	/**
	 *  ```
	 *  Habhub_link $mol_link
	 *  	title <= habhub_title
	 *  	arg * app \habhub
	 *  ```
	 **/
	@ $mol_mem
	Habhub_link() {
		return (( obj )=>{
			obj.title = () => this.habhub_title()
			obj.arg = () => ({
			"app" :  "habhub" ,
		})
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  Files_link $mol_link
	 *  	title <= files_title
	 *  	arg * app \files
	 *  ```
	 **/
	@ $mol_mem
	Files_link() {
		return (( obj )=>{
			obj.title = () => this.files_title()
			obj.arg = () => ({
			"app" :  "files" ,
		})
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  Supplies_link $mol_link
	 *  	title <= supplies_title
	 *  	arg * app \supplies
	 *  ```
	 **/
	@ $mol_mem
	Supplies_link() {
		return (( obj )=>{
			obj.title = () => this.supplies_title()
			obj.arg = () => ({
			"app" :  "supplies" ,
		})
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  Close_app $mol_link
	 *  	arg * app null
	 *  	sub / <= Close_app_icon
	 *  ```
	 **/
	@ $mol_mem
	Close_app() {
		return (( obj )=>{
			obj.arg = () => ({
			"app" :  null as any ,
		})
			obj.sub = () => [].concat( this.Close_app_icon() )
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  Close_app_icon $mol_icon_cross
	 *  ```
	 **/
	@ $mol_mem
	Close_app_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_cross(  ) )
	}

	/**
	 *  ```
	 *  pages /
	 *  	<= Habhub_app
	 *  	<= Files_app
	 *  	<= Supplies_app
	 *  ```
	 **/
	pages() {
		return [].concat( this.Habhub_app() , this.Files_app() , this.Supplies_app() )
	}

	habhub_title() {
		return this.Habhub_app().menu_title(  )
	}

	/**
	 *  ```
	 *  Habhub_app $mol_app_habhub
	 *  	event_front_up?event <=> event_front_up?event
	 *  	menu_title => habhub_title
	 *  	tools_root / <= Close_app
	 *  ```
	 **/
	@ $mol_mem
	Habhub_app() {
		return (( obj )=>{
			obj.event_front_up = ( event? : any ) => this.event_front_up( event )
			obj.tools_root = () => [].concat( this.Close_app() )
			return obj
		})( new this.$.$mol_app_habhub(  ) )
	}

	files_title() {
		return this.Files_app().title_root(  )
	}

	/**
	 *  ```
	 *  Files_app $mol_app_files
	 *  	event_front_up?event <=> event_front_up?event
	 *  	title_root => files_title
	 *  	tools_root / <= Close_app
	 *  	uri_root_default \https://ajaxexplorer.com:443/User5df12c6/
	 *  ```
	 **/
	@ $mol_mem
	Files_app() {
		return (( obj )=>{
			obj.event_front_up = ( event? : any ) => this.event_front_up( event )
			obj.tools_root = () => [].concat( this.Close_app() )
			obj.uri_root_default = () => "https://ajaxexplorer.com:443/User5df12c6/"
			return obj
		})( new this.$.$mol_app_files(  ) )
	}

	supplies_title() {
		return this.Supplies_app().list_title(  )
	}

	/**
	 *  ```
	 *  Supplies_app $mol_app_supplies
	 *  	event_front_up?event <=> event_front_up?event
	 *  	list_title => supplies_title
	 *  	tools_root / <= Close_app
	 *  ```
	 **/
	@ $mol_mem
	Supplies_app() {
		return (( obj )=>{
			obj.event_front_up = ( event? : any ) => this.event_front_up( event )
			obj.tools_root = () => [].concat( this.Close_app() )
			return obj
		})( new this.$.$mol_app_supplies(  ) )
	}

} }

