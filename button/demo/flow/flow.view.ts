module $.$mol {
	
	export class $mol_button_demo_flow extends $.$mol_button_demo_flow {
		
		events( ...diff : Event[] ) {
			alert( diff[0].srcElement.id )
		}
		
	}
	
}
