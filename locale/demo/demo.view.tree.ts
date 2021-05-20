namespace $.$$ {
	export class $mol_locale_demo extends $.$mol_locale_demo {
		language( lang?: any ) {
			if ( lang !== undefined ) return $mol_locale.lang( lang )
			return $mol_locale.lang()
		}


		@ $mol_mem
		item_rows() {
			const count = this.count();
			return Array.from( { length: count }, ( _, index ) => this.Row(index))
		}

		identity( val: any ) {
			return val;
		}
	}

	export class $mol_locale_demo_row extends $.$mol_locale_demo_row {

		@ $mol_mem
		getColor() {
			const palette = [
				"#cdc77b",
				"#9b008b",
				"#556b2f",
				"#ff8c00",
				"#9932cc",
				"#8b0000",
				"#e9967a",
				"#8fbc8f",
				"#ffd700",
				"#daa520" ];
			const plural_rule_fn = $mol_locale.get_plural_rule( $mol_locale.lang() ) || ( (x) => 0 );
			const index = this.index()
			return '' + palette[ plural_rule_fn(index) ]
		}
	}

}
