namespace $ { export class $mol_deck extends $mol_list {

	/**
	 *  ```
	 *  items / *
	 *  	title \
	 *  	Content $mol_view
	 *  ```
	 **/
	@ $mol_mem
	items() {
		return [].concat( ({
			"title" :  "" ,
			"Content" :  (( obj )=>{
			return obj
		})( new this.$.$mol_view(  ) ) ,
		}) )
	}

	/**
	 *  ```
	 *  rows /
	 *  	<= Switch
	 *  	<= Content
	 *  ```
	 **/
	rows() {
		return [].concat( this.Switch() , this.Content() )
	}

	/**
	 *  ```
	 *  Switch $mol_switch
	 *  	value?val <=> current?val
	 *  	options <= switch_options
	 *  ```
	 **/
	@ $mol_mem
	Switch() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.current( val )
			obj.options = () => this.switch_options()
			return obj
		})( new this.$.$mol_switch(  ) )
	}

	/**
	 *  ```
	 *  current?val \0
	 *  ```
	 **/
	@ $mol_mem
	current( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : "0"
	}

	/**
	 *  ```
	 *  switch_options *
	 *  ```
	 **/
	switch_options() {
		return ({
		})
	}

	/**
	 *  ```
	 *  Content null
	 *  ```
	 **/
	Content() {
		return null as any
	}

} }

