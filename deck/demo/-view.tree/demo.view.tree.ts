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
		return [ this.Deck() ] as readonly any[]
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
			obj.items = () => [ this.greeterItem() , this.questerItem() , this.commanderItem() ] as readonly any[]
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
			obj.sub = () => [ this.greeterMessager() ] as readonly any[]
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
			obj.sub = () => [ this.greeterMessage() ] as readonly any[]
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
			obj.sub = () => [ this.questerMessager() ] as readonly any[]
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
			obj.sub = () => [ this.questerMessage() ] as readonly any[]
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
			obj.sub = () => [ this.commanderMessager() ] as readonly any[]
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
			obj.sub = () => [ this.commanderMessage() ] as readonly any[]
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

