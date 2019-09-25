namespace $ { export class $mol_deck_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Simple deck with tabbar
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_deck_demo_title" )
	}

	/**
	 *  ```
	 *  sub / <= Deck
	 *  ```
	 **/
	sub() {
		return [].concat( this.Deck() )
	}

	/**
	 *  ```
	 *  Deck $mol_deck items /
	 *  	<= greeterItem
	 *  	<= questerItem
	 *  	<= commanderItem
	 *  ```
	 **/
	@ $mol_mem
	Deck() {
		return (( obj )=>{
			obj.items = () => [].concat( this.greeterItem() , this.questerItem() , this.commanderItem() )
			return obj
		})( new this.$.$mol_deck(  ) )
	}

	/**
	 *  ```
	 *  greeterItem *
	 *  	title <= greeterLabel
	 *  	Content <= greeterContent
	 *  ```
	 **/
	greeterItem() {
		return ({
			"title" :  this.greeterLabel() ,
			"Content" :  this.greeterContent() ,
		})
	}

	/**
	 *  ```
	 *  greeterLabel @ \Greeting
	 *  ```
	 **/
	greeterLabel() {
		return this.$.$mol_locale.text( "$mol_deck_demo_greeterLabel" )
	}

	/**
	 *  ```
	 *  greeterContent $mol_row sub / <= greeterMessager
	 *  ```
	 **/
	@ $mol_mem
	greeterContent() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.greeterMessager() )
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  greeterMessager $mol_view sub / <= greeterMessage
	 *  ```
	 **/
	@ $mol_mem
	greeterMessager() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.greeterMessage() )
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  greeterMessage @ \Hello, world!
	 *  ```
	 **/
	greeterMessage() {
		return this.$.$mol_locale.text( "$mol_deck_demo_greeterMessage" )
	}

	/**
	 *  ```
	 *  questerItem *
	 *  	title <= questerLabel
	 *  	Content <= questerContent
	 *  ```
	 **/
	questerItem() {
		return ({
			"title" :  this.questerLabel() ,
			"Content" :  this.questerContent() ,
		})
	}

	/**
	 *  ```
	 *  questerLabel @ \Question
	 *  ```
	 **/
	questerLabel() {
		return this.$.$mol_locale.text( "$mol_deck_demo_questerLabel" )
	}

	/**
	 *  ```
	 *  questerContent $mol_row sub / <= questerMessager
	 *  ```
	 **/
	@ $mol_mem
	questerContent() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.questerMessager() )
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  questerMessager $mol_view sub / <= questerMessage
	 *  ```
	 **/
	@ $mol_mem
	questerMessager() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.questerMessage() )
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  questerMessage @ \How are you?
	 *  ```
	 **/
	questerMessage() {
		return this.$.$mol_locale.text( "$mol_deck_demo_questerMessage" )
	}

	/**
	 *  ```
	 *  commanderItem *
	 *  	title <= commanderLabel
	 *  	Content <= commanderContent
	 *  ```
	 **/
	commanderItem() {
		return ({
			"title" :  this.commanderLabel() ,
			"Content" :  this.commanderContent() ,
		})
	}

	/**
	 *  ```
	 *  commanderLabel @ \Command
	 *  ```
	 **/
	commanderLabel() {
		return this.$.$mol_locale.text( "$mol_deck_demo_commanderLabel" )
	}

	/**
	 *  ```
	 *  commanderContent $mol_row sub / <= commanderMessager
	 *  ```
	 **/
	@ $mol_mem
	commanderContent() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.commanderMessager() )
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  commanderMessager $mol_view sub / <= commanderMessage
	 *  ```
	 **/
	@ $mol_mem
	commanderMessager() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.commanderMessage() )
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  commanderMessage @ \Let us do it right!
	 *  ```
	 **/
	commanderMessage() {
		return this.$.$mol_locale.text( "$mol_deck_demo_commanderMessage" )
	}

} }

