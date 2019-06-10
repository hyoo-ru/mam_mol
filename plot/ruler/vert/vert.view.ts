namespace $.$$ {
	export class $mol_plot_ruler_vert extends $.$mol_plot_ruler_vert {
		dimensions_axle() {
			const dims = this.dimensions_pane()
			return [dims[0][1], dims[1][1]] as const
		}

		box_pos_x() {
			return `calc(${this.title_pos_x()} - ${Math.max(0, (this.title().length / 4))}rem`
		}

		viewport_axle() {
			return [0, this.size_real()[1]] as const
		}

		scale_axle() {
			return this.scale()[1]
		}

		scale_step() {
			return -this.scale()[1]
		}

		shift_axle() {
			return this.shift()[1]
		}

		curve() {
			const [, shift] = this.shift()
			const [, scale] = this.scale()

			return this.points().map( point => `M 0 ${ (point * scale + shift).toFixed(3)} H 2000` ).join( ' ' ) || ''
		}

		label_pos_x( index : number ) {
			return this.title_pos_x()
		}

		label_pos_y( index : number ) {
			return (this.points()[index] * this.scale()[1] + this.shift()[1]).toFixed(3) + 'px'
		}
	}
}
