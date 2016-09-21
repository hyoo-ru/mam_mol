module $.$mol {
	export class $mol_highlighter extends $.$mol_highlighter {
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
				chunks.push(this.shadow(this.haystack()));
				return chunks;
			}
			
			let splits = this.haystack().split(this.needle());
			
			for(let index = 0; index < splits.length; index++) {
				if(splits[index] === '' && index !== 0) continue;
				
				chunks.push(this.shadow(splits[index]), (index !== splits.length - 1) ? this.needle() : null);
			}
			
			return chunks;
		}
		
		shadow(str : string) {
			return new $mol_lowlighter_text().setup(obj => {
				obj.childs = () => [str];
			});
		}
	}
}
