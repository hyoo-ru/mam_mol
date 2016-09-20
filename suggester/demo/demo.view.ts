module $.$mol {
	
	export class $mol_suggester_demo extends $.$mol_suggester_demo {
		
		@ $mol_prop()
		threeSuggests() {
			return this.threeCode().length >= 10 ? [] : $mol_stub_strings(this.threeCode(), 30)
		}
	}
	
}
