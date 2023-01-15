namespace $ {
	
	export class $mol_3d_buffer extends Object {
		
		constructor(
			readonly api: WebGL2RenderingContext,
			readonly native: WebGLBuffer,
		) {
			super()
		}
		
		send(
			data: ArrayBufferView[],
		) {

			this.api.bindBuffer( this.api.ARRAY_BUFFER, this.native )
			
			const size = data.reduce( ( sum, buf )=> sum + buf.byteLength, 0 )
			this.api.bufferData( this.api.ARRAY_BUFFER, size, this.api.DYNAMIC_DRAW )
			
			let offset = 0
			for( let buf of data ) {
				this.api.bufferSubData( this.api.ARRAY_BUFFER, offset, buf, 0 )
				offset += buf.byteLength
			}
			
			return data
		}
		
	}
	
}