namespace $ { export class $mol_button extends $mol_view {

	/**
	 *  ```
	 *  enabled true
	 *  ```
	 **/
	enabled() {
		return true
	}

	/**
	 *  ```
	 *  minimal_height 40
	 *  ```
	 **/
	minimal_height() {
		return 40
	}

	/**
	 *  ```
	 *  click?event null
	 *  ```
	 **/
	@ $mol_mem
	click( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
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

	/**
	 *  ```
	 *  event *
	 *  	^
	 *  	click?event <=> event_activate?event
	 *  	keypress?event <=> event_key_press?event
	 *  ```
	 **/
	event() {
		return ({
			...super.event() ,
			"click" :  ( event? : any )=>  this.event_activate( event ) ,
			"keypress" :  ( event? : any )=>  this.event_key_press( event ) ,
		})
	}

	/**
	 *  ```
	 *  event_activate?event null
	 *  ```
	 **/
	@ $mol_mem
	event_activate( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  event_key_press?event null
	 *  ```
	 **/
	@ $mol_mem
	event_key_press( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  attr *
	 *  	^
	 *  	disabled <= disabled
	 *  	role \button
	 *  	tabindex <= tab_index
	 *  	title <= hint
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"disabled" :  this.disabled() ,
			"role" :  "button" ,
			"tabindex" :  this.tab_index() ,
			"title" :  this.hint() ,
		})
	}

	/**
	 *  ```
	 *  disabled false
	 *  ```
	 **/
	disabled() {
		return false
	}

	/**
	 *  ```
	 *  tab_index 0
	 *  ```
	 **/
	tab_index() {
		return 0
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
	 *  sub /$mol_view_content <= title
	 *  ```
	 **/
	sub() {
		return [this.title()] as readonly ( $mol_view_content )[]
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/button/-view.tree/button.view.tree.map