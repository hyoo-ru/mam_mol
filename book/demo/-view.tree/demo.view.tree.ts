namespace $ { export class $mol_book_demo extends $mol_demo_large {

	/**
	 *  ```
	 *  title @ \Adaprive layout for various sizes of screen
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_book_demo_title" )
	}

	/**
	 *  ```
	 *  sub / <= View
	 *  ```
	 **/
	sub() {
		return [].concat( this.View() )
	}

	/**
	 *  ```
	 *  View $mol_book
	 *  	Placeholder <= Placeholder
	 *  	pages /
	 *  		<= Addon
	 *  		<= Main
	 *  ```
	 **/
	@ $mol_mem
	View() {
		return (( obj )=>{
			obj.Placeholder = () => this.Placeholder()
			obj.pages = () => [].concat( this.Addon() , this.Main() )
			return obj
		})( new this.$.$mol_book(  ) )
	}

	/**
	 *  ```
	 *  Placeholder $mol_book_placeholder
	 *  	minimal_width 200
	 *  	sub / \ Placeholder
	 *  ```
	 **/
	@ $mol_mem
	Placeholder() {
		return (( obj )=>{
			obj.minimal_width = () => 200
			obj.sub = () => [].concat( " Placeholder" )
			return obj
		})( new this.$.$mol_book_placeholder(  ) )
	}

	/**
	 *  ```
	 *  Addon $mol_view
	 *  	minimal_width 250
	 *  	sub / \ Addon
	 *  ```
	 **/
	@ $mol_mem
	Addon() {
		return (( obj )=>{
			obj.minimal_width = () => 250
			obj.sub = () => [].concat( " Addon" )
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  Main $mol_view
	 *  	minimal_width 400
	 *  	sub / \ Main
	 *  ```
	 **/
	@ $mol_mem
	Main() {
		return (( obj )=>{
			obj.minimal_width = () => 400
			obj.sub = () => [].concat( " Main" )
			return obj
		})( new this.$.$mol_view(  ) )
	}

} }

