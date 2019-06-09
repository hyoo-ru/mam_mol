namespace $.$$ {
	export class $mol_plot_dot extends $.$mol_plot_dot {

		threshold() {
			return this.diameter() / 2
		}
		
		@ $mol_mem
		curve() {
			return this.points().map( point => 'M ' + point.join( ' ' ) + ' v 0' ).join( ' ' ) || ''
		}
		
	}
}
