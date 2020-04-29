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
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/speck/-view.tree/speck.view.tree.map