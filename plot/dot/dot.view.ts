namespace $.$mol {
	export class $mol_plot_dot extends $.$mol_plot_dot {
		
		marks() {
			return this.points().map( ( _ , index ) => this.Mark( index ) )
		}
		
		mark_pos( index : number ) {
			return this.points()[ index ]
		}
		
		mark_radius() {
			return 2 / Math.sqrt( this.points().length ) + '%'
		}
		
	}
}
