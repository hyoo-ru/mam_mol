module $.$mol {
	
	export class $mol_toolbar_demo extends $.$mol_toolbar_demo {
		
		events( ...diff : Event[] ) {
			alert( ( diff[0].target as HTMLElement ).id )
		}
		
	}
	
}
