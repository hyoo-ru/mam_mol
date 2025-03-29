namespace $.$$ {
	
	/**
	 * List of checkboxes
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_check_list_demo
	 */
	export class $mol_check_list_iconed extends $.$mol_check_list_iconed {

		override option_hint(id: string) {
			return this.icons()[id] && this.icon_only()
				? this.option_title(id)
				: super.option_hint(id)
		}

		override option_label( id: string ) {
			const label = super.option_label(id)

			const icon = this.icons()[id]
			if (icon) {
				return this.icon_only() ? [ icon ] : [ icon, ...label ]
			}

			return label
		}
	}

}
