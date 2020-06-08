namespace $ { export class $mol_map_yandex_demo extends $mol_demo_large {

	/**
	 *  ```
	 *  title @ \Simple Yandex Maps wrapper
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_map_yandex_demo_title" )
	}

	/**
	 *  ```
	 *  sub / <= Map
	 *  ```
	 **/
	sub() {
		return [this.Map()] as readonly any[]
	}

	/**
	 *  ```
	 *  Map $mol_map_yandex objects / <= Place
	 *  ```
	 **/
	@ $mol_mem
	Map() {
		return (( obj )=>{
			obj.objects = () => [this.Place()] as readonly any[]
			return obj
		})( new this.$.$mol_map_yandex(  ) )
	}

	/**
	 *  ```
	 *  Place $mol_map_yandex_mark
	 *  	title <= place_title
	 *  	address <= place_addres
	 *  	content <= place_content
	 *  ```
	 **/
	@ $mol_mem
	Place() {
		return (( obj )=>{
			obj.title = () => this.place_title()
			obj.address = () => this.place_addres()
			obj.content = () => this.place_content()
			return obj
		})( new this.$.$mol_map_yandex_mark(  ) )
	}

	/**
	 *  ```
	 *  place_title \
	 *  ```
	 **/
	place_title() {
		return ""
	}

	/**
	 *  ```
	 *  place_addres \Saint-Petersburg
	 *  ```
	 **/
	place_addres() {
		return "Saint-Petersburg"
	}

	/**
	 *  ```
	 *  place_content \It is Russia's second-largest city after Moscow
	 *  ```
	 **/
	place_content() {
		return "It is Russia's second-largest city after Moscow"
	}

} }
