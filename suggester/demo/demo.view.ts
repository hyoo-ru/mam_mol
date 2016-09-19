module $.$mol {
	
	export class $mol_suggester_demo extends $.$mol_suggester_demo {
		
		@ $mol_prop()
		threeSuggests() {
			const length = 10;
			
			let text = this.threeCode();
			
			if(text.length > length) {
				return [];
			}
			
			return $mol_stub_strings(text, 30);
		}
	}
	
}
