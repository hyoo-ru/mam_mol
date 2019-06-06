namespace $.$$ {
	export class $mol_plot_ruler_hor extends $.$mol_plot_ruler_hor {
		range() {
			const dims = this.dimensions_expanded()

			return {from: dims[0][0], to: dims[1][0], scale: this.scale()[0]} as const
		}

		shift_axle() {
			return this.shift()[0]
		}

		curve() {
			return this.points_generated().scaled.map( point => `M ${ point } 1000 V 0` ).join( ' ' ) || ''
		}

		label_pos_x( index : number ) {
			return this.points_generated().scaled[ index ] + 'px'
		}

		label_pos_y( index : number ) {
			return this.title_pos_y()
		}
	}
}
