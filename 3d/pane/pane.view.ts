namespace $.$$ {

	export class $mol_3d_pane extends $.$mol_3d_pane {

		@ $mol_mem
		context() {
			const canvas = this.dom_node() as HTMLCanvasElement
			let context = canvas.getContext( 'webgl2' )!
			// context = new Proxy( context, {
			// 	get( gl, f ) {
			// 		let v = gl[f]
			// 		if( typeof v !== 'function' ) return v
			// 		return function( ... args: any[] ) {
			// 			let res
			// 			try {
			// 				return res = v.call( gl, ... args )
			// 			} finally {
			// 				console.debug( v.name, '(', ... args, ')=>', res )
			// 			}
			// 		}
			// 	}
			// } )
			return new $mol_3d_context( context )
		}

		@ $mol_mem
		width() {
			return Math.ceil( ( this.view_rect()?.width ?? 0 ) * this.$.$mol_dom_context.devicePixelRatio )
		}
		
		@ $mol_mem
		height() {
			return Math.ceil( ( this.view_rect()?.height ?? 0 ) * this.$.$mol_dom_context.devicePixelRatio )
		}
		
		@ $mol_mem
		viewport() {
			const viewport = [ 0, 0, this.width(), this.height() ] as const
			this.context().native.viewport( ... viewport )
			return viewport
		}
		
		@ $mol_mem
		scissor() {
			const scissor = this.viewport()
			this.context().native.scissor( ... scissor )
			return scissor
		}
		
		render() {
			super.render()
			this.viewport()
			this.scissor()
			this.paint()
		}
		
	}

}
