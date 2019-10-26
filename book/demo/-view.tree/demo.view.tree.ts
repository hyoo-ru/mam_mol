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
		return [ this.View() ] as readonly any[]
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
			obj.pages = () => [ this.Addon() , this.Main() ] as readonly any[]
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
			obj.sub = () => [ " Placeholder" ] as readonly any[]
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
			obj.sub = () => [ " Addon" ] as readonly any[]
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
			obj.sub = () => [ " Main" ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

} }

