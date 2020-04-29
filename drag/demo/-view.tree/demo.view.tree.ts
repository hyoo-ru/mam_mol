namespace $ { export class $mol_drag_demo extends $mol_demo_large {

	/**
	 *  ```
	 *  products_count 100
	 *  ```
	 **/
	products_count() {
		return 100
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
	 *  	<= Trash_drop
	 *  	<= List_drop
	 *  ```
	 **/
	@ $mol_mem
	Scroll() {
		return (( obj )=>{
			obj.sub = () => [ this.Trash_drop() , this.List_drop() ] as readonly any[]
			return obj
		})( new this.$.$mol_scroll(  ) )
	}

	/**
	 *  ```
	 *  Trash_drop $mol_drop
	 *  	adopt?transfer <=> transfer_adopt?transfer
	 *  	receive?obj <=> receive_trash?obj
	 *  	Sub <= Trash
	 *  ```
	 **/
	@ $mol_mem
	Trash_drop() {
		return (( obj )=>{
			obj.adopt = ( transfer? : any ) => this.transfer_adopt( transfer )
			obj.receive = ( obj? : any ) => this.receive_trash( obj )
			obj.Sub = () => this.Trash()
			return obj
		})( new this.$.$mol_drop(  ) )
	}

	/**
	 *  ```
	 *  transfer_adopt?transfer null
	 *  ```
	 **/
	@ $mol_mem
	transfer_adopt( transfer? : any , force? : $mol_mem_force ) {
		return ( transfer !== void 0 ) ? transfer : null as any
	}

	/**
	 *  ```
	 *  receive_trash?obj null
	 *  ```
	 **/
	@ $mol_mem
	receive_trash( obj? : any , force? : $mol_mem_force ) {
		return ( obj !== void 0 ) ? obj : null as any
	}

	/**
	 *  ```
	 *  Trash $mol_float sub /
	 *  	<= Trash_icon
	 *  	\Trash
	 *  ```
	 **/
	@ $mol_mem
	Trash() {
		return (( obj )=>{
			obj.sub = () => [ this.Trash_icon() , "Trash" ] as readonly any[]
			return obj
		})( new this.$.$mol_float(  ) )
	}

	/**
	 *  ```
	 *  Trash_icon $mol_icon_trash_can_outline
	 *  ```
	 **/
	@ $mol_mem
	Trash_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_trash_can_outline(  ) )
	}

	/**
	 *  ```
	 *  List_drop $mol_drop
	 *  	adopt?transfer <=> transfer_adopt?transfer
	 *  	receive?obj <=> receive?obj
	 *  	Sub <= List
	 *  ```
	 **/
	@ $mol_mem
	List_drop() {
		return (( obj )=>{
			obj.adopt = ( transfer? : any ) => this.transfer_adopt( transfer )
			obj.receive = ( obj? : any ) => this.receive( obj )
			obj.Sub = () => this.List()
			return obj
		})( new this.$.$mol_drop(  ) )
	}

	/**
	 *  ```
	 *  receive?obj null
	 *  ```
	 **/
	@ $mol_mem
	receive( obj? : any , force? : $mol_mem_force ) {
		return ( obj !== void 0 ) ? obj : null as any
	}

	/**
	 *  ```
	 *  List $mol_list rows <= product_cards
	 *  ```
	 **/
	@ $mol_mem
	List() {
		return (( obj )=>{
			obj.rows = () => this.product_cards()
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  product_cards /
	 *  ```
	 **/
	product_cards() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  Product_item!prod $mol_drag
	 *  	transfer *
	 *  		text/plain <= product_title!prod
	 *  		text/html <= product_html!prod
	 *  		text/uri-list <= product_uri!prod
	 *  	Sub <= Product_drop!prod
	 *  ```
	 **/
	@ $mol_mem_key
	Product_item( prod : any ) {
		return (( obj )=>{
			obj.transfer = () => ({
			"text/plain" :  this.product_title(prod) ,
			"text/html" :  this.product_html(prod) ,
			"text/uri-list" :  this.product_uri(prod) ,
		})
			obj.Sub = () => this.Product_drop(prod)
			return obj
		})( new this.$.$mol_drag(  ) )
	}

	/**
	 *  ```
	 *  product_title!prod \
	 *  ```
	 **/
	product_title( prod : any ) {
		return ""
	}

	/**
	 *  ```
	 *  product_html!prod \
	 *  ```
	 **/
	product_html( prod : any ) {
		return ""
	}

	/**
	 *  ```
	 *  product_uri!prod \
	 *  ```
	 **/
	product_uri( prod : any ) {
		return ""
	}

	/**
	 *  ```
	 *  Product_drop!prod $mol_drop
	 *  	adopt?transfer <=> transfer_adopt?transfer
	 *  	receive?obj <=> receive_before!prod?obj
	 *  	Sub <= Product_link!prod
	 *  ```
	 **/
	@ $mol_mem_key
	Product_drop( prod : any ) {
		return (( obj )=>{
			obj.adopt = ( transfer? : any ) => this.transfer_adopt( transfer )
			obj.receive = ( obj? : any ) => this.receive_before(prod , obj )
			obj.Sub = () => this.Product_link(prod)
			return obj
		})( new this.$.$mol_drop(  ) )
	}

	/**
	 *  ```
	 *  receive_before!prod?obj null
	 *  ```
	 **/
	@ $mol_mem_key
	receive_before( prod : any , obj? : any , force? : $mol_mem_force ) {
		return ( obj !== void 0 ) ? obj : null as any
	}

	/**
	 *  ```
	 *  Product_link!prod $mol_link
	 *  	uri <= product_uri!prod
	 *  	sub / <= product_title!prod
	 *  ```
	 **/
	@ $mol_mem_key
	Product_link( prod : any ) {
		return (( obj )=>{
			obj.uri = () => this.product_uri(prod)
			obj.sub = () => [ this.product_title(prod) ] as readonly any[]
			return obj
		})( new this.$.$mol_link(  ) )
	}

} }

