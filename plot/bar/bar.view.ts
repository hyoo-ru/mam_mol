namespace $.$mol {
	export class $mol_plot_bar extends $.$mol_plot_bar {
		
		curve() {
			const points = this.points()
			if( points.length < 1 ) return ''
			
			return points.map( point => 'M ' + point[0] + ' 0 V ' + point[1] ).join( ' ' )
		}
		
		stroke_width() {
			return 50 / this.points().length + '%'
		}
		
	}
}
