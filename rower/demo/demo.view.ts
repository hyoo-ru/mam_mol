module $.$mol {
	
	export class $mol_rower_demo extends $.$mol_rower_demo {
		
		eventLog( next? : Event ) {
			alert( ( next.target as HTMLElement ).id )
		}
		
	}
	
}
