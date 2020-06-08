namespace $ { export class $mol_map_yandex_mark extends $mol_object {

	/**
	 *  ```
	 *  pos $mol_vector_2d /
	 *  	0
	 *  	0
	 *  ```
	 **/
	@ $mol_mem
	pos() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_vector_2d( 0 , 0 ) )
	}

	/**
	 *  ```
	 *  box $mol_vector_2d /
	 *  	<= box_lat
	 *  	<= box_lon
	 *  ```
	 **/
	@ $mol_mem
	box() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_vector_2d( this.box_lat() , this.box_lon() ) )
	}

	/**
	 *  ```
	 *  box_lat $mol_vector_range /
	 *  	0
	 *  	0
	 *  ```
	 **/
	@ $mol_mem
	box_lat() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_vector_range( 0 , 0 ) )
	}

	/**
	 *  ```
	 *  box_lon $mol_vector_range /
	 *  	0
	 *  	0
	 *  ```
	 **/
	@ $mol_mem
	box_lon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_vector_range( 0 , 0 ) )
	}

	/**
	 *  ```
	 *  hint \
	 *  ```
	 **/
	hint() {
		return ""
	}

	/**
	 *  ```
	 *  title <= address
	 *  ```
	 **/
	title() {
		return this.address()
	}

	/**
	 *  ```
	 *  address \
	 *  ```
	 **/
	address() {
		return ""
	}

	/**
	 *  ```
	 *  content \
	 *  ```
	 **/
	content() {
		return ""
	}

} }
