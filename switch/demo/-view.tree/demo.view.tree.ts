namespace $ { export class $mol_switch_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Color switchers in various state
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_switch_demo_title" )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Enabled
	 *  	<= Disabled
	 *  ```
	 **/
	sub() {
		return [this.Enabled() , this.Disabled()] as readonly any[]
	}

	/**
	 *  ```
	 *  Enabled $mol_switch
	 *  	value?val <=> color?val
	 *  	options *
	 *  		red <= option_red
	 *  		green <= option_green
	 *  		blue <= option_blue
	 *  ```
	 **/
	@ $mol_mem
	Enabled() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.color( val )
			obj.options = () => ({
			"red" :  this.option_red() ,
			"green" :  this.option_green() ,
			"blue" :  this.option_blue() ,
		})
			return obj
		})( new this.$.$mol_switch(  ) )
	}

	/**
	 *  ```
	 *  color?val \red
	 *  ```
	 **/
	@ $mol_mem
	color( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : "red"
	}

	/**
	 *  ```
	 *  option_red @ \Red
	 *  ```
	 **/
	option_red() {
		return this.$.$mol_locale.text( "$mol_switch_demo_option_red" )
	}

	/**
	 *  ```
	 *  option_green @ \Green
	 *  ```
	 **/
	option_green() {
		return this.$.$mol_locale.text( "$mol_switch_demo_option_green" )
	}

	/**
	 *  ```
	 *  option_blue @ \Blue
	 *  ```
	 **/
	option_blue() {
		return this.$.$mol_locale.text( "$mol_switch_demo_option_blue" )
	}

	/**
	 *  ```
	 *  Disabled $mol_switch
	 *  	value?val <=> color?val
	 *  	enabled false
	 *  	options *
	 *  		red <= option_red
	 *  		green <= option_green
	 *  		blue <= option_blue
	 *  ```
	 **/
	@ $mol_mem
	Disabled() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.color( val )
			obj.enabled = () => false
			obj.options = () => ({
			"red" :  this.option_red() ,
			"green" :  this.option_green() ,
			"blue" :  this.option_blue() ,
		})
			return obj
		})( new this.$.$mol_switch(  ) )
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/switch/demo/-view.tree/demo.view.tree.map