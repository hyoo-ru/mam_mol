namespace $.$$ {
	export class $mol_plot_ruler_hor extends $.$mol_plot_ruler_hor {
		dimensions_axis() {
			return this.dimensions_pane().x
		}

		viewport_axis() {
			return new this.$.$mol_vector_range(0, this.size_real().x)
		}

		scale_axis() {
			return this.scale()[0]
		}

		scale_step() {
			return this.scale()[0]
		}

		shift_axis() {
			return this.shift()[0]
		}
		
		curve() {
			const [shift] = this.shift()
			const [scale] = this.scale()

			return this.points().map( point => {
				const scaled = point * scale + shift
				return `M ${scaled.toFixed(3)} 1000 V 0`
			}).join( ' ' )
		}

		label_pos_x( index : number ) {
			return (this.points()[index] * this.scale()[0] + this.shift()[0]).toFixed(3) + 'px'
		}

		background_y() {
			return String(this.size_real()[1] - this.font_size())
		}

		background_height() {
			return String(this.font_size())
		}
	}
}
