namespace $.$mol {

	export class $mol_select_demo_custom extends $.$mol_select_demo_custom {
		background_color(id: string) {
			return `background: ${$mol_colors[id]}`
		}
		prop(id: string) {
			return id;
		}
		colors() {
			return Object.keys($mol_colors);
		}
	}
}
