namespace $.$$ {
	export class $mol_plot_mark_hor extends $.$mol_plot_mark_hor {
		@ $mol_mem
		points() {
			const [start, end] = this.viewport_dimensions()
			const step = this.step()
			const points_raw = this.points_raw()
			let current = start

			const next = [] as number[]

			next.push(points_raw[0][0])
			for (let point of points_raw) {
				const [point_x] = point
				if (point_x >= current) {
					next.push(point_x)
					current += step
					if (current > end) break
				}
			}
			next.push(points_raw[points_raw.length - 1][0])

			return next
		}
		
	}
}
