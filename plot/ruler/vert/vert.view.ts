namespace $.$$ {
	export class $mol_plot_ruler_vert extends $.$mol_plot_ruler_vert {
		viewport() {
			const dims = this.dimensions_pane()
			return [dims[0][1], dims[1][1]] as const
		}

		step_scale() {
			return -this.scale()[1]
		}

		normalize(val: number) {
			const [,size] = this.size_real()
			const [,shift] = this.shift()
			const [,scale] = this.scale()
			const step = this.step()

			if (scale == 0) return val

			const scaled = val * scale + shift
			let count = 0
			if (scaled < 0) count = scaled / (step * scale)
			if (scaled > size) count = (scaled - size) / (step * scale)

			return val - Math.round(count) * step
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
