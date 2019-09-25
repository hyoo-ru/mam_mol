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
		return [].concat( this.Simple() , this.Pending() )
	}

	/**
	 *  ```
	 *  Simple $mol_card Content $mol_row sub / \Hello world!
	 *  ```
	 **/
	@ $mol_mem
	Simple() {
		return (( obj )=>{
			obj.Content = () => (( obj )=>{
			obj.sub = () => [].concat( "Hello world!" )
			return obj
		})( new this.$.$mol_row(  ) )
			return obj
		})( new this.$.$mol_card(  ) )
	}

	/**
	 *  ```
	 *  Pending $mol_card
	 *  	Content $mol_row sub / \Hello pending!
	 *  	status \pending
	 *  ```
	 **/
	@ $mol_mem
	Pending() {
		return (( obj )=>{
			obj.Content = () => (( obj )=>{
			obj.sub = () => [].concat( "Hello pending!" )
			return obj
		})( new this.$.$mol_row(  ) )
			obj.status = () => "pending"
			return obj
		})( new this.$.$mol_card(  ) )
	}

} }

