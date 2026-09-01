namespace $.$$ {

	export class $mol_canvas extends $.$mol_canvas {

		@ $mol_mem
		context() {
			return ( this.dom_node() as HTMLCanvasElement ).getContext( '2d' )!
		}

		@ $mol_mem
		width() {
			return Math.ceil( ( this.view_rect()?.width ?? 0 ) * this.$.$mol_dom_context.devicePixelRatio )
		}
		
		@ $mol_mem
		height() {
			return Math.ceil( ( this.view_rect()?.height ?? 0 ) * this.$.$mol_dom_context.devicePixelRatio )
		}
		
		render() {
			super.render()
			this.paint()
		}

	}

}
