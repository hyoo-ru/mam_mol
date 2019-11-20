namespace $.$$ {

	export class $mol_canvas extends $.$mol_canvas {

		@ $mol_mem
		context() {
			return ( this.dom_node() as HTMLCanvasElement ).getContext( '2d' )
		}

		render() {
			super.render()
			this.paint()
		}

	}

}
