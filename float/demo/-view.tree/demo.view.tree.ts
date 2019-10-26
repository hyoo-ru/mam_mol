namespace $ { export class $mol_float_demo extends $mol_demo_large {

	/**
	 *  ```
	 *  title @ \Floating header example
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_float_demo_title" )
	}

	/**
	 *  ```
	 *  sub / <= Scroll
	 *  ```
	 **/
	sub() {
		return [ this.Scroll() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Scroll $mol_scroll sub /
	 *  	<= Head
	 *  	<= Content
	 *  ```
	 **/
	@ $mol_mem
	Scroll() {
		return (( obj )=>{
			obj.sub = () => [ this.Head() , this.Content() ] as readonly any[]
			return obj
		})( new this.$.$mol_scroll(  ) )
	}

	/**
	 *  ```
	 *  Head $mol_float sub / <= Head_card
	 *  ```
	 **/
	@ $mol_mem
	Head() {
		return (( obj )=>{
			obj.sub = () => [ this.Head_card() ] as readonly any[]
			return obj
		})( new this.$.$mol_float(  ) )
	}

	/**
	 *  ```
	 *  Head_card $mol_card sub / <= Head_row
	 *  ```
	 **/
	@ $mol_mem
	Head_card() {
		return (( obj )=>{
			obj.sub = () => [ this.Head_row() ] as readonly any[]
			return obj
		})( new this.$.$mol_card(  ) )
	}

	/**
	 *  ```
	 *  Head_row $mol_row sub / <= Head_content
	 *  ```
	 **/
	@ $mol_mem
	Head_row() {
		return (( obj )=>{
			obj.sub = () => [ this.Head_content() ] as readonly any[]
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  Head_content $mol_view sub / \Float header
	 *  ```
	 **/
	@ $mol_mem
	Head_content() {
		return (( obj )=>{
			obj.sub = () => [ "Float header" ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  Content $mol_row sub /
	 *  	<= Filler1
	 *  	<= Filler2
	 *  ```
	 **/
	@ $mol_mem
	Content() {
		return (( obj )=>{
			obj.sub = () => [ this.Filler1() , this.Filler2() ] as readonly any[]
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  Filler1 $mol_filler
	 *  ```
	 **/
	@ $mol_mem
	Filler1() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_filler(  ) )
	}

	/**
	 *  ```
	 *  Filler2 $mol_filler
	 *  ```
	 **/
	@ $mol_mem
	Filler2() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_filler(  ) )
	}

} }

