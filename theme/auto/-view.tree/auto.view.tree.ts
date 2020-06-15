namespace $ { export class $mol_theme_auto extends $mol_plugin {

	/**
	 *  ```
	 *  attr * mol_theme <= theme
	 *  ```
	 **/
	attr() {
		return ({
			"mol_theme" :  this.theme() ,
		})
	}

	/**
	 *  ```
	 *  theme \
	 *  ```
	 **/
	theme() {
		return ""
	}

} }
