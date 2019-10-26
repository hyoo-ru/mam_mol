namespace $ { export class $mol_list extends $mol_view {

	/**
	 *  ```
	 *  sub <= rows
	 *  ```
	 **/
	sub() {
		return this.rows()
	}

	/**
	 *  ```
	 *  rows /$mol_view
	 *  ```
	 **/
	rows() {
		return [  ] as readonly ( $mol_view )[]
	}

	/**
	 *  ```
	 *  Empty null
	 *  ```
	 **/
	Empty() {
		return null as any
	}

} }

