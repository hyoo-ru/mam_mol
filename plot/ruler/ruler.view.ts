namespace $.$mol {
	export class $mol_plot_ruler extends $.$mol_plot_ruler {
		
		curve() {
			const shift = this.shift()
			const points = this.points()
			if( points.length < 1 ) return ''
			
			const last = points[ points.length -1 ]
			
			const vert = points.map( point => `M ${ point[0] } ${ shift[1] } V ${ point[1] }` ).join( ' ' )
			const hor = `M ${ points[0][0] } ${ shift[1] } H ${ last[0] }`
			
			return vert + hor
		}
		
	}
}
