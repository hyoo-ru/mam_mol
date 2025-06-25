namespace $.$$ {

	/**
	 * The [plugin](../../plugin/readme.md) which defines theme based on [mol_lights](../../lights/readme.md).
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_lights_demo
	 */
	export class $mol_theme_auto extends $.$mol_theme_auto {

		theme() {
			return this.$.$mol_lights() ? this.light() : this.dark()
		}

	}
}
