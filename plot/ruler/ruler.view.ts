namespace $.$mol {
	export class $mol_plot_ruler extends $.$mol_plot_ruler {
		
		curve() {
			const points = this.points()
			if( points.length < 1 ) return ''
			
			const last = points[ points.length -1 ]
			
			return points.map( point => 'M ' + point[0] + ' 0 V ' + point[1] ).join( ' ' ) + ' M 0 0 H ' + last[0]
		}
		
	}
}
