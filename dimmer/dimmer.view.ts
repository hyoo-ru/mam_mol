module $.$mol {
	export class $mol_dimmer extends $.$mol_dimmer {
		childs() {
			let chunks: any[] = [];
			let isMatched: any;
			let isEqual: boolean;
			
			isMatched = !!this.haystack().match(new RegExp(this.needle(), 'g'));
			isEqual = this.haystack() === this.needle();
			
			if(isEqual) {
				chunks.push(this.haystack());
				return chunks;
			}
			
			if(!this.needle() || !isMatched) {
				chunks.push(this.low(this.haystack()));
				return chunks;
			}
			
			let splits = this.haystack().split(this.needle());
			
			for(let index = 0; index < splits.length; index++) {
				if(splits[index] === '' && index !== 0) continue;
				
				chunks.push(this.low(splits[index]), (index !== splits.length - 1) ? this.needle() : null);
			}
			
			return chunks;
		}
		
		low(str : string) {
			return new $mol_dimmer_text().setup(obj => {
				obj.childs = () => [str];
			});
		}
	}
}
