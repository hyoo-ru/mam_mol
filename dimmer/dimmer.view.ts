module $.$mol {
	export class $mol_dimmer extends $.$mol_dimmer {
		childs() {
			let chunks: any[] = [];
			let isMatched: any;
			let isEqual: boolean;
			
			isMatched = !!this.haystack().match(new RegExp(this.needle(), 'g'));
			isEqual = this.haystack() === this.needle();
			
			if(isEqual) {
				chunks.push(this.low(0));
				return chunks;
			}
			
			if(!this.needle() || !isMatched) {
				chunks.push(this.low(0));
				return chunks;
			}
			
			let splits = this.splits();
			
			for(let index = 0; index < splits.length; index++) {
				if(index) {
					chunks.push(this.needle());
				}
				
				if(splits[index]) {
					chunks.push(this.low(index));
				}
			}
			
			return chunks;
		}
		
		splits() {
			return this.haystack().split(this.needle());
		}
		
		@ $mol_prop()
		low(index : number) {
			return new $mol_dimmer_text().setup(obj => {
				obj.childs = () => [this.splits()[index]];
			});
		}
	}
}
