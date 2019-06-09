namespace $.$$ {
	export class $mol_plot_ruler_hor extends $.$mol_plot_ruler_hor {
		viewport() {
			const dims = this.dimensions_viewport_total()
			return [dims[0][0], dims[1][0]] as const
		}

		normalize(val: number) {
			const [size] = this.size_real()
			const [shift] = this.shift()
			const [scale] = this.scale()
			const step = this.step()

			if (scale == 0) return val

			const scaled = val * scale + shift
			let count = 0
			if (scaled < 0) count = scaled / (step * scale)
			if (scaled > size) count = (scaled - size) / (step * scale)

			return val - Math.round(count) * step
		}

		step_scale() {
			return this.scale()[0]
		}

		curve() {
			const [shift] = this.shift()
			const [scale] = this.scale()

			return this.points().map( point => `M ${ (point * scale + shift).toFixed(3) } 1000 V 0` ).join( ' ' ) || ''
		}

		label_pos_x( index : number ) {
			return (this.points()[index] * this.scale()[0] + this.shift()[0]).toFixed(3) + 'px'
		}

		label_pos_y( index : number ) {
			return this.title_pos_y()
		}
	}
}
