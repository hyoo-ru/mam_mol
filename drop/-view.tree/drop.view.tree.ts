namespace $ { export class $mol_drop extends $mol_ghost {

	/**
	 *  ```
	 *  event *
	 *  	dragenter?event <=> enter?event
	 *  	dragover?event <=> move?event
	 *  	dragleave?event <=> leave?event
	 *  	drop?event <=> drop?event
	 *  ```
	 **/
	event() {
		return ({
			"dragenter" :  ( event? : any )=>  this.enter( event ) ,
			"dragover" :  ( event? : any )=>  this.move( event ) ,
			"dragleave" :  ( event? : any )=>  this.leave( event ) ,
			"drop" :  ( event? : any )=>  this.drop( event ) ,
		})
	}

	/**
	 *  ```
	 *  enter?event null
	 *  ```
	 **/
	@ $mol_mem
	enter( event? : any , force? : $mol_mem_force ) {
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
	 *  leave?event null
	 *  ```
	 **/
	@ $mol_mem
	leave( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  drop?event null
	 *  ```
	 **/
	@ $mol_mem
	drop( event? : any , force? : $mol_mem_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/**
	 *  ```
	 *  attr * mol_drop_status <= status?val
	 *  ```
	 **/
	attr() {
		return ({
			"mol_drop_status" :  this.status() ,
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
	 *  adopt?transfer *
	 *  ```
	 **/
	@ $mol_mem
	adopt( transfer? : any , force? : $mol_mem_force ) {
		return ( transfer !== void 0 ) ? transfer : ({
		})
	}

	/**
	 *  ```
	 *  receive?transfer null
	 *  ```
	 **/
	@ $mol_mem
	receive( transfer? : any , force? : $mol_mem_force ) {
		return ( transfer !== void 0 ) ? transfer : null as any
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/drop/-view.tree/drop.view.tree.map