namespace $.$$ {

	export class $mol_check_group extends $.$mol_check_group {
		
		@ $mol_mem
		checked( next? : boolean ) {
			
			if( next !== undefined ) {
				for( const check of this.checks() ) {
					check.checked( next )
				}
			}
			
			return this.checks().some( check => check.checked() )
			
		}

		@ $mol_mem
		full() {
			return this.checks().every( check => check.checked() )
		}
		
		@ $mol_mem
		Icon() {
			return this.full() ? new $mol_icon_tick : new $mol_icon_square_small
		}

	}

}
