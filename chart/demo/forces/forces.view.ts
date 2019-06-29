namespace $.$$ {
	
	export class $mol_chart_demo_forces extends $.$mol_chart_demo_forces {

		forces(): readonly [readonly number[], readonly number[]] {
			const samples_count = this.samples_count()

			const max_x = 600
			const base_y = 80
			const amplitude = 5
			const freq = 50
			const series_x = [] as number[]
			const series_y = [] as number[]
			const ratio = max_x / samples_count

			for (let i = 0; i < samples_count; i++) {
				const deviation = Math.random() > 0.6 ? (Math.random() * 3) : Math.random()
				const value = Number((base_y + Math.sin((freq / samples_count) * i) * amplitude * deviation).toFixed(3))
				series_x.push(Number(Number(i * ratio).toFixed(3)))
				series_y.push(value)
			}

			return [series_x, series_y] as const
		}

		@$mol_mem
		forces_left() {
			return this.forces()
		}

		@$mol_mem
		forces_right() {
			return this.forces()
		}

		forces_left_x() {
			return this.forces_left()[0]
		}
		
		forces_left_y() {
			return this.forces_left()[1]
		}

		forces_right_x() {
			return this.forces_right()[0]
		}
		
		forces_right_y() {
			return this.forces_right()[1]
		}
	}
	
}
