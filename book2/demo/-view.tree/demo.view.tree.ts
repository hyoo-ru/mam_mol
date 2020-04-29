namespace $ { export class $mol_book2_demo extends $mol_demo_large {

	/**
	 *  ```
	 *  title @ \Adaprive layout for various sizes of screen
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_book2_demo_title" )
	}

	/**
	 *  ```
	 *  sub / <= View
	 *  ```
	 **/
	sub() {
		return [this.View()] as readonly any[]
	}

	/**
	 *  ```
	 *  View $mol_book2 pages /
	 *  	<= First
	 *  	<= Second
	 *  	<= Third
	 *  ```
	 **/
	@ $mol_mem
	View() {
		return (( obj )=>{
			obj.pages = () => [this.First() , this.Second() , this.Third()] as readonly any[]
			return obj
		})( new this.$.$mol_book2(  ) )
	}

	/**
	 *  ```
	 *  First $mol_view sub / \ First
	 *  ```
	 **/
	@ $mol_mem
	First() {
		return (( obj )=>{
			obj.sub = () => [" First"] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  Second $mol_view sub / \ Second
	 *  ```
	 **/
	@ $mol_mem
	Second() {
		return (( obj )=>{
			obj.sub = () => [" Second"] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  Third $mol_view sub / \ Third
	 *  ```
	 **/
	@ $mol_mem
	Third() {
		return (( obj )=>{
			obj.sub = () => [" Third"] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/book2/demo/-view.tree/demo.view.tree.map