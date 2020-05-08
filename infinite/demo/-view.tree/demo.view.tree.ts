namespace $ { export class $mol_infinite_demo extends $mol_demo_large {

	/**
	 *  ```
	 *  title @ \Infinite list demo
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_infinite_demo_title" )
	}

	/**
	 *  ```
	 *  chunk_size 20
	 *  ```
	 **/
	chunk_size() {
		return 20
	}

	/**
	 *  ```
	 *  sub / <= Scroll
	 *  ```
	 **/
	sub() {
		return [this.Scroll()] as readonly any[]
	}

	/**
	 *  ```
	 *  Scroll $mol_scroll sub / <= List
	 *  ```
	 **/
	@ $mol_mem
	Scroll() {
		return (( obj )=>{
			obj.sub = () => [this.List()] as readonly any[]
			return obj
		})( new this.$.$mol_scroll(  ) )
	}

	/**
	 *  ```
	 *  List $mol_infinite
	 *  	after!anchor_id <= after!anchor_id
	 *  	Row!id <= Item!id
	 *  ```
	 **/
	@ $mol_mem
	List() {
		return (( obj )=>{
			obj.after = ( anchor_id : any ) => this.after(anchor_id)
			obj.Row = ( id : any ) => this.Item(id)
			return obj
		})( new this.$.$mol_infinite(  ) )
	}

	/**
	 *  ```
	 *  after!anchor_id /
	 *  ```
	 **/
	after( anchor_id : any ) {
		return [] as readonly any[]
	}

	/**
	 *  ```
	 *  Item!id $mol_row
	 *  	minimal_height 40
	 *  	sub / <= item_title!id
	 *  ```
	 **/
	@ $mol_mem_key
	Item( id : any ) {
		return (( obj )=>{
			obj.minimal_height = () => 40
			obj.sub = () => [this.item_title(id)] as readonly any[]
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  item_title!id \
	 *  ```
	 **/
	item_title( id : any ) {
		return ""
	}

} }
