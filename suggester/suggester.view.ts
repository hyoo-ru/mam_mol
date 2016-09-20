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
		
		eventClick(index : number, e : MouseEvent) {
			this.value(this.suggests()[index]);
		}
		
		eventDown(e: KeyboardEvent) {
			let selectedRow:number = this.selectedRow();
			let suggestsLength = this.suggests().length;
			
			if(e.keyCode === 13) {
				this.value(this.suggests()[selectedRow - 1]);
				this.selectedRow(0);
			}
			
			if(e.keyCode === 40) {
				selectedRow = selectedRow === suggestsLength ? 0 : ++selectedRow;
				this.selectedRow(selectedRow);
			}
			
			if(e.keyCode === 38) {
				selectedRow = selectedRow === 0 ? suggestsLength : --selectedRow;
				this.selectedRow(selectedRow);
			}
			
		}
		
		selected(index: number) {
			return this.selectedRow() ? index === (this.selectedRow() - 1) : false;
		}
		
		@ $mol_prop()
		rower(index : number) {
			return new $mol_suggester_rower().setup(obj => {
				obj.childs = () => [this.suggests()[index]];
				obj.eventClick = e => this.eventClick(index, e);
				obj.selected = () => this.selected(index)
			});
		}
	}
}
