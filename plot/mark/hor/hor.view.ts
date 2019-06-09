namespace $.$$ {
	export class $mol_plot_mark_hor extends $.$mol_plot_mark_hor {
		// @ $mol_mem
		// step() {
		// 	const points = this.points_viewport()
		// 	const [[left], [right]] = points.raw_limit
		// 	const step = (right - left) / this.visible_marks()
		// 	return step
		// }

		count() {
			return this.points_viewport().scaled.length * this.scale()[0] / 100
		}
		
		@ $mol_mem
		step() {
			const count = this.count()
			const points = this.points_viewport().scaled
			let step = Math.max( 1 , Math.ceil( points.length / count ) )
			return step
		}

		precision() {
			const step = this.step()
			return Math.max( 0 , Math.min( 15 , ( step - Math.floor( step ) ).toString().length - 2 ) )
		}

		@ $mol_mem
		points_axle() {
			const {raw_limit, raw, scaled} = this.points_viewport() as any
			const [[left], [right]] = raw_limit
			const step = (right - left) / this.visible_marks()
			const next = {scaled: [] as number[], raw: [] as number[]}
			let pos = left
			for (let i = 0; i < raw.length; i++) {
				const point = raw[i]
				if (point[0] >= pos) {
					next.raw.push(point[0])
					next.scaled.push(scaled[i][0])
					pos += step
					if (pos > right) break
				}
			}

			return next
		}
		
	}
}
