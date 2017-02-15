namespace $.$mol {
	export class $mol_plot_dot extends $.$mol_plot_dot {
		
		marks() {
			return this.points_scaled().map( ( _ , index ) => this.Mark( index ) )
		}
		
		mark_pos( index : number ) {
			return this.points_scaled()[ index ]
		}
		
	}
}
