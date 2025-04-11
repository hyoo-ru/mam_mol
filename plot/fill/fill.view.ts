namespace $.$$ {
	export class $mol_plot_fill extends $.$mol_plot_fill {

		curve() {
			const points = this.points()
			if( points.length === 0 ) return ''
			
			const [, shift_y] = this.shift()

			const main = points.map( (point, index) => `${index === 0 ? 'M' : 'L'} ${point.join(' ')}`).join(' ')

			return `${main} V ${shift_y} H ${points[0][0]}`
		}
		
		front() {
			return []
		}
		
		back() {
			return [ this ]
		}
		
	}
}
