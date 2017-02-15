namespace $.$mol {
	
	export class $mol_plot_demo extends $.$mol_plot_demo {
		
		@ $mol_mem()
		input_series() {
			return $mol_range_in({
				length : this.count() ,
				item( index ) {
					return 4 + Math.sin( index )
				}
			}).valueOf() as number[]
		}

		@ $mol_mem()
		output_series() {
			$mol_state_time.now( 125 )
			const input = this.input_series()
			return $mol_range_in({
				length : this.count() ,
				item( index ) {
					return input[ index ] - Math.random() * 2
				}
			}).valueOf() as number[]
		}
		
		@ $mol_mem()
		saturation_series() {
			const input = this.output_series()
			const prev = ( this['saturation_series()'] || [] ) as number[]
			return input.map( ( val , i )=> {
				return Math.max( val , ( val + 9 * ( prev[ i ] || 0 ) ) / 10 )
			} )
		}
		
	}
	
}
