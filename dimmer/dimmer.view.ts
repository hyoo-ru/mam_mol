module $.$mol {
	export class $mol_dimmer extends $.$mol_dimmer {
		childs() {
			let chunks: any[] = [];
			
			if(this.isEqual()) {
				chunks.push(this.haystack());
				return chunks;
			}
			
			if(!this.needle()) {
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
			if(!this.needle()) {
				return [this.haystack()];
			}
			return this.haystack().split(this.needle());
		}
		
		isEqual() {
			return this.haystack() === this.needle();
		}
		
		@ $mol_prop()
		low(index : number) {
			return new $mol_dimmer_text().setup(obj => {
				obj.childs = () => [this.splits()[index]];
			});
		}
	}
}
