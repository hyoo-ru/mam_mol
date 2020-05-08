namespace $ { export class $mol_tiler extends $mol_view {

	/**
	 *  ```
	 *  sub <= items
	 *  ```
	 **/
	sub() {
		return this.items()
	}

	/**
	 *  ```
	 *  items /$mol_view
	 *  ```
	 **/
	items() {
		return [] as readonly ( $mol_view )[]
	}

} }
