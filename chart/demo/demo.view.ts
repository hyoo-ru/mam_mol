namespace $.$mol {
	
	export class $mol_chart_demo extends $.$mol_chart_demo {
		
		@ $mol_mem()
		series() {
			return $mol_range_in({
				length : this.count() ,
				item( index ) {
					return 6 + Math.sin( index )
				}
			}).valueOf() as number[]
		}
		
		@ $mol_mem()
		series_1() {
			return this.series().map( val => val - 1 )
		}
		
		@ $mol_mem()
		series_2() {
			return this.series().map( val => val - 2 )
		}
		
		@ $mol_mem()
		series_3() {
			return this.series().map( val => val - 3 )
		}
		
		@ $mol_mem()
		series_4() {
			return this.series().map( val => val - 4 )
		}
		
		@ $mol_mem()
		series_5() {
			return this.series().map( val => val - 5 )
		}
		
		@ $mol_mem()
		series_6() {
			return this.series().map( val => val - 6 )
		}
		
	}
	
}
