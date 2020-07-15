namespace $ { export class $mol_speck extends $mol_view {

	/**
	 *  ```
	 *  attr *
	 *  	^
	 *  	mol_theme \$mol_theme_accent
	 *  ```
	 **/
	attr() {
		return ({
			...super.attr() ,
			"mol_theme" :  "$mol_theme_accent" ,
		})
	}

	/**
	 *  ```
	 *  style *
	 *  	^
	 *  	minHeight \1em
	 *  ```
	 **/
	style() {
		return ({
			...super.style() ,
			"minHeight" :  "1em" ,
		})
	}

	/**
	 *  ```
	 *  sub / <= value
	 *  ```
	 **/
	sub() {
		return [this.value()] as readonly any[]
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
