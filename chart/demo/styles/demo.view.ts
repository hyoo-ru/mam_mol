namespace $.$$ {
	
	export class $mol_chart_demo_styles extends $.$mol_chart_demo_styles {
		
		@ $mol_mem
		series() {
			const next = [] as number[]
			const shift = 10
			const limit = shift + this.samples_count() 
			
			for( let i = shift ; i < limit ; ++ i ) {
				next[ i ] = Number( ( 6.5 + Math.sin( 8 * i / limit ) ).toFixed( 3 ) )
			}
			
			return next
		}
		
		@ $mol_mem
		series_1() {
			return this.series().map( val => ( val - 1 ).toFixed( 3 ) ).map( Number )
		}
		
		@ $mol_mem
		series_2() {
			return this.series().map( val => ( val - 2 ).toFixed( 3 ) ).map( Number )
		}
		
		@ $mol_mem
		series_3() {
			return this.series().map( val => ( val - 3 ).toFixed( 3 ) ).map( Number )
		}
		
		@ $mol_mem
		series_4() {
			return this.series().map( val => ( val - 4 ).toFixed( 3 ) ).map( Number )
		}
		
		@ $mol_mem
		series_5() {
			return this.series().map( val => ( val - 5 ).toFixed( 3 ) ).map( Number )
		}
		
		@ $mol_mem
		series_6() {
			return this.series().map( val => ( val - 6 ).toFixed( 3 ) ).map( Number )
		}
		
	}
	
}
