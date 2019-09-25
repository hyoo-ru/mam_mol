namespace $ { export class $mol_link_iconed extends $mol_link {

	/**
	 *  ```
	 *  sub /
	 *  	<= Icon
	 *  	<= content
	 *  ```
	 **/
	sub() {
		return [].concat( this.Icon() , this.content() )
	}

	/**
	 *  ```
	 *  Icon $mol_image uri <= icon
	 *  ```
	 **/
	@ $mol_mem
	Icon() {
		return (( obj )=>{
			obj.uri = () => this.icon()
			return obj
		})( new this.$.$mol_image(  ) )
	}

	/**
	 *  ```
	 *  icon \
	 *  ```
	 **/
	icon() {
		return ""
	}

	/**
	 *  ```
	 *  content / <= title
	 *  ```
	 **/
	content() {
		return [].concat( this.title() )
	}

	/**
	 *  ```
	 *  title <= uri
	 *  ```
	 **/
	title() {
		return this.uri()
	}

	/**
	 *  ```
	 *  host \
	 *  ```
	 **/
	host() {
		return ""
	}

} }

