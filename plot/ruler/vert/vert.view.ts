namespace $.$$ {
	export class $mol_plot_ruler_vert extends $.$mol_plot_ruler_vert {		
		range() {
			const dims = this.dimensions_expanded()

			return {from: dims[0][1], to: dims[1][1], scale: this.scale()[1]}
		}

		direction() {
			return -1
		}

		shift_axle() {
			return this.shift()[1]
		}
		
		curve() {
			return this.points_generated().scaled.map( point => `M 0 ${ point } H 2000` ).join( ' ' ) || ''
		}

		label_pos_x( index : number ) {
			return this.title_pos_x()
		}

		label_pos_y( index : number ) {
			return this.points_generated().scaled[ index ] + 'px'
		}
	}
}
