namespace $.$$ {
	
	export class $mol_chart_demo_styles extends $.$mol_chart_demo_styles {

		limit() {
			const shift = 10
			return [shift, shift + this.samples_count()] as const
		}

		@ $mol_mem
		series_x() {
			const next = [] as number[]
			const [shift, limit] = this.limit()
			for (let i = shift; i < limit; i++) next.push(i)

			return next
		}
		
		@ $mol_mem
		series_y() {
			const [, limit] = this.limit()

			return this.series_x().map(i => Number( ( 6.5 + Math.sin( 8 * i / limit ) ).toFixed( 3 ) ))
		}

		@ $mol_mem
		series_1_y() {
			return this.series_y().map( val => ( val - 1 ).toFixed( 3 ) ).map( Number )
		}
		
		@ $mol_mem
		series_2_y() {
			return this.series_y().map( val => ( val - 2 ).toFixed( 3 ) ).map( Number )
		}
		
		@ $mol_mem
		series_3_y() {
			return this.series_y().map( val => ( val - 3 ).toFixed( 3 ) ).map( Number )
		}
		
		@ $mol_mem
		series_4_y() {
			return this.series_y().map( val => ( val - 4 ).toFixed( 3 ) ).map( Number )
		}
		
		@ $mol_mem
		series_5_y() {
			return this.series_y().map( val => ( val - 5 ).toFixed( 3 ) ).map( Number )
		}
		
		@ $mol_mem
		series_6_y() {
			return this.series_y().map( val => ( val - 6 ).toFixed( 3 ) ).map( Number )
		}
		
	}
	
}
