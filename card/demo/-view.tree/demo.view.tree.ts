namespace $ { export class $mol_card_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Cards with optional status
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_card_demo_title" )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Simple
	 *  	<= Pending
	 *  ```
	 **/
	sub() {
		return [this.Simple() , this.Pending()] as readonly any[]
	}

	/**
	 *  ```
	 *  Simple $mol_card Content <= Simple_content
	 *  ```
	 **/
	@ $mol_mem
	Simple() {
		return (( obj )=>{
			obj.Content = () => this.Simple_content()
			return obj
		})( new this.$.$mol_card(  ) )
	}

	/**
	 *  ```
	 *  Simple_content $mol_row sub / \Hello world!
	 *  ```
	 **/
	@ $mol_mem
	Simple_content() {
		return (( obj )=>{
			obj.sub = () => ["Hello world!"] as readonly any[]
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  Pending $mol_card
	 *  	Content <= Pending_content
	 *  	status \pending
	 *  ```
	 **/
	@ $mol_mem
	Pending() {
		return (( obj )=>{
			obj.Content = () => this.Pending_content()
			obj.status = () => "pending"
			return obj
		})( new this.$.$mol_card(  ) )
	}

	/**
	 *  ```
	 *  Pending_content $mol_row sub / \Hello pending!
	 *  ```
	 **/
	@ $mol_mem
	Pending_content() {
		return (( obj )=>{
			obj.sub = () => ["Hello pending!"] as readonly any[]
			return obj
		})( new this.$.$mol_row(  ) )
	}

} }
