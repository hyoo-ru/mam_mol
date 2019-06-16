namespace $.$$ {
	
	export class $mol_chart_demo_simple extends $.$mol_chart_demo_simple {
		hor_label_text( index : number ) {
			const val = this.months()[index]
			return val.replace( /^\w/ , letter => letter.toUpperCase() )
		}
	}
	
}
