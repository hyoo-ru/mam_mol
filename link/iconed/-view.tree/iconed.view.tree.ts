namespace $ { export class $mol_link_iconed extends $mol_link {

	/**
	 *  ```
	 *  sub / <= Icon
	 *  ```
	 **/
	sub() {
		return [this.Icon()] as readonly any[]
	}

	/**
	 *  ```
	 *  Icon $mol_image
	 *  	uri <= icon
	 *  	title \
	 *  ```
	 **/
	@ $mol_mem
	Icon() {
		return (( obj )=>{
			obj.uri = () => this.icon()
			obj.title = () => ""
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
		return [this.title()] as readonly any[]
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
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/link/iconed/-view.tree/iconed.view.tree.map