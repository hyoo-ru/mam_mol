module $.$mol {
	
	export class $mol_rower_demo extends $.$mol_rower_demo {
		
		eventLog( ...diff : Event[] ) {
			alert( ( diff[0].target as HTMLElement ).id )
		}
		
	}
	
}
