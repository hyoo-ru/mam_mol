module $.$mol {
	export class $mol_suggester extends $.$mol_suggester {
		
		eventChangeHandler() {
			return console.log(this.suggests().filter(suggest => suggest.toLowerCase()));
		}
		
		suggestRows() {
			return this.suggests().map((suggest, index) => this.rower(index));
		}
		
		@ $mol_prop()
		rower(index : number) {
			return new $mol_viewer().setup(obj => {
				obj.childs = () => [this.suggests()[index]];
			});
		}
	}
}
