namespace $ { export class $mol_link_iconed_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Link with icon
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_link_iconed_demo_title" )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Input
	 *  	<= Output
	 *  ```
	 **/
	sub() {
		return [ this.Input() , this.Output() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Input $mol_string value?val <=> uri?val
	 *  ```
	 **/
	@ $mol_mem
	Input() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.uri( val )
			return obj
		})( new this.$.$mol_string(  ) )
	}

	/**
	 *  ```
	 *  uri?val \https://www.google.com/search?q=%24mol
	 *  ```
	 **/
	@ $mol_mem
	uri( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : "https://www.google.com/search?q=%24mol"
	}

	/**
	 *  ```
	 *  Output $mol_link_iconed uri <= uri?val
	 *  ```
	 **/
	@ $mol_mem
	Output() {
		return (( obj )=>{
			obj.uri = () => this.uri()
			return obj
		})( new this.$.$mol_link_iconed(  ) )
	}

} }

