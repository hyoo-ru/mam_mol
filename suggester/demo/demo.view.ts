module $.$mol {
	
	export class $mol_suggester_demo extends $.$mol_suggester_demo {
		
		generateDictionary() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
			var dictionary: any[] = [];

			for(let i = 0; i < 30; i++) {
				
				text = '';
				
				for(let j=0; j < 10; j++ ) {
					text += possible.charAt( Math.floor( Math.random() * possible.length ) );
				}

				dictionary.push(text.toLowerCase());
			}
			
			return dictionary;
		}
	}
	
}
