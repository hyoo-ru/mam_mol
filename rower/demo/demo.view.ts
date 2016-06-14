module $.$mol {
	
	export class $mol_rower_demo extends $.$mol_rower_demo {
		
		events( ...diff : Event[] ) {
			alert( ( diff[0].target as HTMLElement ).id )
		}
		
	}
	
}
