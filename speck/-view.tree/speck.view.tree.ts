namespace $ { export class $mol_speck extends $mol_view {

	/**
	 *  ```
	 *  attr * mol_theme \$mol_theme_accent
	 *  ```
	 **/
	attr() {
		return ({
			"mol_theme" :  "$mol_theme_accent" ,
		})
	}

	/**
	 *  ```
	 *  sub / <= value
	 *  ```
	 **/
	sub() {
		return [].concat( this.value() )
	}

	/**
	 *  ```
	 *  value null
	 *  ```
	 **/
	value() {
		return null as any
	}

} }

