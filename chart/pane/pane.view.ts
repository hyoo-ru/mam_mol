namespace $.$$ {

	export class $mol_chart_pane extends $.$mol_chart_pane {

		graph_hue( index : number ) {
			return ( 360 + ( this.hue_base() + this.hue_shift() * index ) % 360 ) % 360
		}

		@ $mol_mem
		graphs_colored() {
			const graphs = this.graphs_visible()
			const focused_str = this.graph_focused()
			const focused = focused_str === "" ? -1 : Number(focused_str)

			for (let index = 0; index < graphs.length; index++) {
				const hue = this.graph_hue( index )
				const is_focused = focused === index

				graphs[index].hue( hue )

				// Override color method for this graph
				graphs[index].color = () => {
					if (!hue) return ''
					const lightness = is_focused ? 50 : 35
					return `hsl( ${ hue } , 100% , ${ lightness }% )`
				}
			}

			return graphs
		}

	}

}
