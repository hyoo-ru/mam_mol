module $.$mol {
	
	export class $mol_clicker_demo_toolbar extends $.$mol_clicker_demo_toolbar {
		
		events( ...diff : Event[] ) {
			alert( diff[0].srcElement.id )
		}
		
	}
	
}
