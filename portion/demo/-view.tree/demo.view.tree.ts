namespace $ { export class $mol_portion_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Progress bar in various states
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_portion_demo_title" )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Empty
	 *  	<= Partial
	 *  	<= Full
	 *  ```
	 **/
	sub() {
		return [this.Empty() , this.Partial() , this.Full()] as readonly any[]
	}

	/**
	 *  ```
	 *  Empty $mol_portion portion <= fist
	 *  ```
	 **/
	@ $mol_mem
	Empty() {
		return (( obj )=>{
			obj.portion = () => this.fist()
			return obj
		})( new this.$.$mol_portion(  ) )
	}

	/**
	 *  ```
	 *  fist 0
	 *  ```
	 **/
	fist() {
		return 0
	}

	/**
	 *  ```
	 *  Partial $mol_portion portion <= second
	 *  ```
	 **/
	@ $mol_mem
	Partial() {
		return (( obj )=>{
			obj.portion = () => this.second()
			return obj
		})( new this.$.$mol_portion(  ) )
	}

	/**
	 *  ```
	 *  second 0.5
	 *  ```
	 **/
	second() {
		return 0.5
	}

	/**
	 *  ```
	 *  Full $mol_portion portion <= third
	 *  ```
	 **/
	@ $mol_mem
	Full() {
		return (( obj )=>{
			obj.portion = () => this.third()
			return obj
		})( new this.$.$mol_portion(  ) )
	}

	/**
	 *  ```
	 *  third 1
	 *  ```
	 **/
	third() {
		return 1
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/portion/demo/-view.tree/demo.view.tree.map