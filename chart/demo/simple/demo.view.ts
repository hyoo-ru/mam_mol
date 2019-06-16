namespace $.$$ {
	
	export class $mol_chart_demo_simple extends $.$mol_chart_demo_simple {
		hor_label_text( key : number ) {
			const val = this.Marker_hor().labels_viewport()[key]
			return val.replace( /^\w/ , letter => letter.toUpperCase() )
		}
	}
	
}
