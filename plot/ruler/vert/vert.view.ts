namespace $.$$ {
	export class $mol_plot_ruler_vert extends $.$mol_plot_ruler_vert {
		dimensions_axis() {
			return this.dimensions_pane().y
		}

		viewport_axis() {
			return new this.$.$mol_vector_range(0, this.size_real().y)
		}

		scale_axis() {
			return this.scale()[1]
		}

		scale_step() {
			return -this.scale()[1]
		}

		shift_axis() {
			return this.shift()[1]
		}

		curve() {
			const [, shift] = this.shift()
			const [, scale] = this.scale()

			return this.points().map( point => {
				const scaled = point * scale + shift
				return `M 0 ${scaled.toFixed(3)} H 2000`
			}).join( ' ' )
		}

		title_pos_x() {
			return String(this.gap().x.min)
		}

		label_pos_y( index : number ) {
			return (this.points()[index] * this.scale()[1] + this.shift()[1]).toFixed(3)
		}
	}
}
