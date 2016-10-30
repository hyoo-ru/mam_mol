namespace $.$mol {
	
	export class $mol_clicker_demo extends $.$mol_clicker_demo {
		
		events( ...diff : Event[] ) {
			alert( ( diff[0].target as HTMLElement ).id )
		}
		
	}
	
}
