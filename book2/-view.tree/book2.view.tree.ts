namespace $ { export class $mol_book2 extends $mol_scroll {

	/**
	 *  ```
	 *  sub <= pages
	 *  ```
	 **/
	sub() {
		return this.pages()
	}

	/**
	 *  ```
	 *  pages /$mol_view
	 *  ```
	 **/
	pages() {
		return [] as readonly ( $mol_view )[]
	}

	/**
	 *  ```
	 *  minimal_width 0
	 *  ```
	 **/
	minimal_width() {
		return 0
	}

	/**
	 *  ```
	 *  Placeholder $mol_view
	 *  ```
	 **/
	@ $mol_mem
	Placeholder() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_view(  ) )
	}

} }
