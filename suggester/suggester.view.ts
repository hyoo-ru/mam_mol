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
		
		eventMouseDown( index : number , e : MouseEvent ) {
			this.value( this.suggests()[ index ] );
			this.selectedRow( 0 );
			
			e.preventDefault();
		}
		
		eventDown( e : KeyboardEvent ) {
			let selectedRow : number = this.selectedRow();
			let suggestsLength = this.suggester_lister().childsVisible().length;
			let isSelectedKey = e.keyCode === 13 || e.keyCode === 39;
			
			if( isSelectedKey ) {
				this.value( this.suggests()[ selectedRow - 1 ] );
				this.selectedRow( 0 );
			}
			
			if( e.keyCode === 40 ) {
				selectedRow = selectedRow === suggestsLength ? 0 : ++selectedRow;
				this.selectedRow( selectedRow );
			}
			
			if( e.keyCode === 38 ) {
				selectedRow = selectedRow === 0 ? suggestsLength : --selectedRow;
				this.selectedRow( selectedRow );
			}
			
		}
		
		selected( index : number ) {
			return this.selectedRow() ? index === (this.selectedRow() - 1) : false;
		}
		
		
		@ $mol_prop()
		dimmer( index: number ) {
			return new $mol_dimmer().setup(
				obj => {
					obj.haystack = () => this.suggests()[ index ];
					obj.needle = () => this.suggester_stringer().value();
				}
			)
		}
		
		@ $mol_prop()
		rower( index : number ) {
			return new $mol_suggester_rower().setup(
				obj => {
					obj.heightMinimal = () => 36;
					obj.childs = () => [ this.dimmer(index) ];
					obj.eventMouseDown = e => this.eventMouseDown( index , e );
					obj.selected = () => this.selected( index )
				}
			);
		}
	}
}
