module $.$mol {
	export class $mol_suggester extends $.$mol_suggester {
		
		suggestRows() {
			return this.suggests().map((suggest, index) => this.rower(index));
		}
		
		childs() {
			return [
				this.suggester_stringer(),
				(this.focused() && this.suggests().length) ?
					this.suggester_lister() : null
			];
		}
		
		@ $mol_prop()
		rower(index : number) {
			return new $mol_viewer().setup(obj => {
				obj.childs = () => [this.suggests()[index]];
			});
		}
	}
}
