namespace $.$$ {
	export class $mol_plot_ruler extends $.$mol_plot_ruler {
		dimensions() {
			return [
				[ Number.POSITIVE_INFINITY , Number.POSITIVE_INFINITY ] ,
				[ Number.NEGATIVE_INFINITY , Number.NEGATIVE_INFINITY ] ,
			]
		}

		@ $mol_mem
		points() {
			return [[], []] as [number[], number[]]
		}
				
		labels() {
			return this.points()[0].map( ( point , index )=> this.Label( index ) )
		}
		
		precision() {
			const step = this.step()
			return Math.max( 0 , Math.min( 15 , ( step - Math.floor( step ) ).toString().length - 2 ) )
		}

		label_text( index : number ) {
			return this.points()[1][ index ].toFixed( this.precision() )
		}
		
		back() {
			return [ this ]
		}
	}
}
