module $.$mol {
	
	export class $mol_button_demo_toolbar extends $.$mol_button_demo_toolbar {
		
		events( ...diff : Event[] ) {
			alert( diff[0].srcElement.id )
		}
		
	}
	
}
