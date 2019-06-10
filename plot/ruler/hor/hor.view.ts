namespace $.$$ {
	export class $mol_plot_ruler_hor extends $.$mol_plot_ruler_hor {
		axle_viewport() {
			const dims = this.dimensions_pane()
			return [dims[0][0], dims[1][0]] as const
		}

		normalize(val: number) {
			const [[first], [last]] = this.viewport()
			const [shift] = this.shift()
			const [scale] = this.scale()
			const step = this.step()

			if (scale == 0) return val
			const step_scaled = step * scale
			const scaled = val * scale + shift
			let count = 0
			if (scaled < first) count = (scaled - first) / step_scaled
			if (scaled > last) count = (scaled - last) / step_scaled

			return val - Math.floor(count) * step
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
