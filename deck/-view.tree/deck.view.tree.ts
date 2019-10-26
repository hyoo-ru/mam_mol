namespace $ { export class $mol_deck extends $mol_list {

	/**
	 *  ```
	 *  items / *
	 *  	title \
	 *  	Content <= Content
	 *  ```
	 **/
	items() {
		return [ ({
			"title" :  "" ,
			"Content" :  this.Content() ,
		}) ] as readonly any[]
	}

	/**
	 *  ```
	 *  Content $mol_view
	 *  ```
	 **/
	@ $mol_mem
	Content() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  rows /$mol_view
	 *  	<= Switch
	 *  	<= Content
	 *  ```
	 **/
	rows() {
		return [ this.Switch() , this.Content() ] as readonly ( $mol_view )[]
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
	current( val? : any , force? : $mol_mem_force ) {
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

} }

