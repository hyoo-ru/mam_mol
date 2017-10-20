namespace $.$$ {
	
	export class $mol_plot_demo extends $.$mol_plot_demo {
		
		@ $mol_mem
		input_series() {
			return $mol_range_in({
				length : this.count() ,
				item( index ) {
					return Math.sin( index / 2 ) * 2
				}
			}).valueOf() as number[]
		}

		@ $mol_mem
		output_series() {
			$mol_state_time.now( 125 )
			const input = this.input_series()
			return $mol_range_in({
				length : this.count() ,
				item( index ) {
					return input[ index ] * Math.random()
				}
			}).valueOf() as number[]
		}
		
		@ $mol_mem
		saturation_series() {
			const input = this.output_series()
			const prev = ( $mol_atom_current().cache() || [] ) as number[]
			return input.map( ( val , i )=> {
				const next = ( val + 9 * ( prev[ i ] || 0 ) ) / 10
				return ( Math.abs( next ) > Math.abs( val ) ) ? next : val
			} )
		}
		
	}
	
}
