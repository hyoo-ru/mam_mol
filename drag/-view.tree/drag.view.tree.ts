namespace $ { export class $mol_drag extends $mol_ghost {

	/**
	 *  ```
	 *  event *
	 *  	dragstart?event <=> start?event
	 *  	drag?event <=> move?event
	 *  	dragend?event <=> end?event
	 *  ```
	 **/
	event() {
		return ({
			"dragstart" :  ( event? : any )=>  this.start( event ) ,
			"drag" :  ( event? : any )=>  this.move( event ) ,
			"dragend" :  ( event? : any )=>  this.end( event ) ,
		})
	}

	/**
	 *  ```
	 *  start?event null
	 *  ```
	 **/
	@ $mol_mem
	start( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  move?event null
	 *  ```
	 **/
	@ $mol_mem
	move( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  end?event null
	 *  ```
	 **/
	@ $mol_mem
	end( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  attr *
	 *  	draggable true
	 *  	mol_drag_status <= status?val
	 *  ```
	 **/
	attr() {
		return ({
			"draggable" :  true ,
			"mol_drag_status" :  this.status() ,
		})
	}

	/**
	 *  ```
	 *  status?val \ready
	 *  ```
	 **/
	@ $mol_mem
	status( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : "ready"
	}

	/**
	 *  ```
	 *  transfer *
	 *  	text/plain \
	 *  	text/html \
	 *  	text/uri-list \
	 *  ```
	 **/
	transfer() {
		return ({
			"text/plain" :  "" ,
			"text/html" :  "" ,
			"text/uri-list" :  "" ,
		})
	}

	/**
	 *  ```
	 *  allow_copy true
	 *  ```
	 **/
	allow_copy() {
		return true
	}

	/**
	 *  ```
	 *  allow_link true
	 *  ```
	 **/
	allow_link() {
		return true
	}

	/**
	 *  ```
	 *  allow_move true
	 *  ```
	 **/
	allow_move() {
		return true
	}

	/**
	 *  ```
	 *  image <= dom_node
	 *  ```
	 **/
	image() {
		return this.dom_node()
	}

} }

