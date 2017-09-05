namespace $.$$ {
	
	export class $mol_chart_demo_simple extends $.$mol_chart_demo_simple {
		
		hor_label_text( key : string ) {
			return key.replace( /^\w/ , letter => letter.toUpperCase() )
		}
		
	}
	
}
