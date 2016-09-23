module $.$mol {
	
	export class $mol_suggester_lister extends $.$mol_suggester_lister {
		@ $mol_prop()
		heightAvailable( ...diff : number[] ) {
			return diff[ 0 ] / 3
		}
	}
	
	export class $mol_suggester extends $.$mol_suggester {
		
		suggestRows() {
			return this.suggests().map( ( suggest , index ) => this.rower( index ) );
		}
		
		childs() {
			return [
				this.suggester_stringer() ,
				(this.focused() && this.suggests().length) ?
					this.suggester_lister() : null
			];
		}
		
		eventRowerSelect( index : number , e : MouseEvent ) {
			this.value( this.suggests()[ index ] );
			this.selectedRow( 0 );
			
			e.preventDefault();
		}
		
		@ $mol_prop()
		selectedRow( ...diff : any[] ) {
			this.value();
			return ( diff[0] !== void 0 ) ? diff[0] : 0
		}
		
		eventPress(  ...diff : KeyboardEvent[] ) {
			let code = diff[0]['code'] || diff[0].key;
			let selectedRow : number = this.selectedRow();
			let suggestsLength = this.suggester_lister().childsVisible().length;
			let isSelectedKey = code === 'Enter' || code === 'ArrowRight';
			let spaceKey = code === 'Space' ? ' ' : '';
			
			if( isSelectedKey || spaceKey) {
				
				if(spaceKey) {
					diff[0].preventDefault();
				}
				
				this.value( this.suggests()[ selectedRow - 1 ] + spaceKey);
			}
			
			if( code === 'ArrowDown' ) {
				selectedRow = selectedRow === suggestsLength ? 0 : ++selectedRow;
				this.selectedRow( selectedRow );
			}
			
			if( code === 'ArrowUp' ) {
				selectedRow = selectedRow === 0 ? suggestsLength : --selectedRow;
				this.selectedRow( selectedRow );
			}
			
		}
		
		selected( index : number ) {
			return this.selectedRow() ? index === (this.selectedRow() - 1) : false;
		}
		
		suggest(index: number) {
			return this.suggests()[index];
		}
	}
}
