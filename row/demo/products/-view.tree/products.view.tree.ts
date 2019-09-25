namespace $ { export class $mol_row_demo_products extends $mol_demo_large {

	/**
	 *  ```
	 *  title @ \Product catalog
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_row_demo_products_title" )
	}

	/**
	 *  ```
	 *  count 500
	 *  ```
	 **/
	count() {
		return 500
	}

	/**
	 *  ```
	 *  Product!id $mol_card
	 *  	minimal_width 140
	 *  	minimal_height 100
	 *  	content / <= product_title!id
	 *  ```
	 **/
	@ $mol_mem_key
	Product( id : any ) {
		return (( obj )=>{
			obj.minimal_width = () => 140
			obj.minimal_height = () => 100
			obj.content = () => [].concat( this.product_title(id) )
			return obj
		})( new this.$.$mol_card(  ) )
	}

	/**
	 *  ```
	 *  product_title!id \
	 *  ```
	 **/
	product_title( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  sub / <= Catalog
	 *  ```
	 **/
	sub() {
		return [].concat( this.Catalog() )
	}

	/**
	 *  ```
	 *  Catalog $mol_scroll sub / <= Products
	 *  ```
	 **/
	@ $mol_mem
	Catalog() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.Products() )
			return obj
		})( new this.$.$mol_scroll(  ) )
	}

	/**
	 *  ```
	 *  Products $mol_row sub <= products
	 *  ```
	 **/
	@ $mol_mem
	Products() {
		return (( obj )=>{
			obj.sub = () => this.products()
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  products /
	 *  ```
	 **/
	products() {
		return [].concat(  )
	}

} }

