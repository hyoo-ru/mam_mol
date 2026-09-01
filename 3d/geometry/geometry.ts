namespace $ {
	export class $mol_3d_geometry extends Object {
		
		constructor(
			readonly api: WebGL2RenderingContext,
			readonly vertexes = api.createVertexArray(),
		) {
			super()
		}
		
		destructor() {
			this.api.deleteVertexArray( this.vertexes )
		}
		
		size = 0
		count = 1
		
		use( task: ( geometry: $mol_3d_geometry )=> void ) {
			
			try {
				
				this.api.bindVertexArray( this.vertexes )
				task( this )
				return this
				
			} finally {
				this.api.bindVertexArray( null )
			}
			
		}
		
	} 
}