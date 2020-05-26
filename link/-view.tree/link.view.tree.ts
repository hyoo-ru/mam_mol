namespace $ { export class $mol_link extends $mol_view {

	/**
	 *  ```
	 *  dom_name \a
	 *  ```
	 **/
	dom_name() {
		return "a"
	}

	/**
	 *  ```
	 *  attr *
	 *  	^
	 *  	href <= uri
	 *  	title <= hint
	 *  	target <= target
	 *  	download <= file_name
	 *  	mol_link_current <= current
	 *  	mol_theme <= theme
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"href" :  this.uri() ,
			"title" :  this.hint() ,
			"target" :  this.target() ,
			"download" :  this.file_name() ,
			"mol_link_current" :  this.current() ,
			"mol_theme" :  this.theme() ,
		})
	}

	/**
	 *  ```
	 *  uri \
	 *  ```
	 **/
	uri() {
		return ""
	}

	/**
	 *  ```
	 *  hint \
	 *  ```
	 **/
	hint() {
		return ""
	}

	/**
	 *  ```
	 *  target \_self
	 *  ```
	 **/
	target() {
		return "_self"
	}

	/**
	 *  ```
	 *  file_name \
	 *  ```
	 **/
	file_name() {
		return ""
	}

	/**
	 *  ```
	 *  current false
	 *  ```
	 **/
	current() {
		return false
	}

	/**
	 *  ```
	 *  theme null
	 *  ```
	 **/
	theme() {
		return null as any
	}

	/**
	 *  ```
	 *  sub /$mol_view_content <= title
	 *  ```
	 **/
	sub() {
		return [this.title()] as readonly ( $mol_view_content )[]
	}

	/**
	 *  ```
	 *  arg *
	 *  ```
	 **/
	arg() {
		return ({
		})
	}

	/**
	 *  ```
	 *  event *
	 *  	^
	 *  	click?event <=> click?event
	 *  ```
	 **/
	event() {
		return ({
			...super.event() ,
			"click" :  ( event? : any )=>  this.click( event ) ,
		})
	}

	/**
	 *  ```
	 *  click?event <=> event_click?event
	 *  ```
	 **/
	@ $mol_mem
	click( event? : any , force? : $mol_mem_force ) {
		return this.event_click( event )
	}

	/**
	 *  ```
	 *  event_click?event null
	 *  ```
	 **/
	@ $mol_mem
	event_click( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

} }
