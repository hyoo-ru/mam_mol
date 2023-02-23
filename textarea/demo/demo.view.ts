namespace $.$$ {
	export class $mol_textarea_demo extends $.$mol_textarea_demo {
		
		@ $mol_mem
		symbols_hint() {
			
			let rows = [
				... Object.entries( this.Disabled().symbols_alt() )
					.map( ([ name, val ])=> `Alt + ${name}: ${val}` ),
				... Object.entries( this.Disabled().symbols_alt_shift() )
					.map( ([ name, val ])=> `Alt + Shift + ${name}: ${val}` ),
			]
			
			return rows.join( '\n' )
			
		}
		
	}
}
