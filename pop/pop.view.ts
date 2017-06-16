namespace $.$mol {
	export class $mol_pop extends $.$mol_pop {
		
		sub() {
			return [
				this.Anchor() ,
				this.showed() ? this.Bubble() : null ,
			]
		}
		
		height_max() {
			return this.$.$mol_view_visible_height() * 0.3;
		}
		
	}
}
