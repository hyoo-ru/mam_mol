namespace $ { export class $mol_button_typed extends $mol_button {

} }

namespace $ { export class $mol_button_major extends $mol_button_typed {

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

} }

namespace $ { export class $mol_button_minor extends $mol_button_typed {

} }

