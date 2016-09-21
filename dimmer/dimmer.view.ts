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
				let current = splits[index],
					next = splits[index + 1];
				
				if(this.isEmpty(current) && !this.isEmpty(next) && index === 0) {
					chunks.push(this.needle());
					continue;
				}
				if(this.isEmpty(current) && !this.isEmpty(next) && index !== 0) {
					chunks.push(this.low(current), this.needle());
					continue;
				}
				if(this.isEmpty(current) && (index === splits.length - 1)) {
					continue;
				}
				if(!this.isEmpty(current) && (index === splits.length - 1)) {
					chunks.push(this.low(current));
					continue;
				}
				
				chunks.push(this.low(current), this.needle());
			}
			
			return chunks;
		}
		
		isEmpty(str: string) {
			return typeof str === "string" ? str === '' : true;
		}
		
		low(str : string) {
			return new $mol_dimmer_text().setup(obj => {
				obj.childs = () => [str];
			});
		}
	}
}
