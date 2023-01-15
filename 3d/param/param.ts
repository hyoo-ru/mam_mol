namespace $ {
	
	const float_size = 4
	
	export class $mol_3d_param extends Object {
		
		constructor(
			readonly api: WebGL2RenderingContext,
			readonly location: number,
		) {
			super()
		}
		
		@ $mol_mem_key
		vector( vals: number ) {
			
			const buffer = this.api.createBuffer()!
			this.api.bindBuffer( this.api.ARRAY_BUFFER, buffer )
			
			this.api.enableVertexAttribArray( this.location )
			this.api.vertexAttribPointer( this.location, vals, this.api.FLOAT, false, 0, 0 )
			
			return new $mol_3d_buffer( this.api, buffer )
			
		}
		
		@ $mol_mem_key
		vectors( vals: number ) {
			
			const buffer = this.api.createBuffer()!
			this.api.bindBuffer( this.api.ARRAY_BUFFER, buffer )
			
			this.api.enableVertexAttribArray( this.location )
			this.api.vertexAttribPointer( this.location, vals, this.api.FLOAT, false, 0, 0 )
			this.api.vertexAttribDivisor( this.location, 1 )
			
			return new $mol_3d_buffer( this.api, buffer )
			
		}
		
		@ $mol_mem_key
		vectors_byte( vals: number ) {
			
			const buffer = this.api.createBuffer()!
			this.api.bindBuffer( this.api.ARRAY_BUFFER, buffer )
			
			this.api.enableVertexAttribArray( this.location )
			this.api.vertexAttribPointer( this.location, vals, this.api.UNSIGNED_BYTE, false, 0, 0 )
			this.api.vertexAttribDivisor( this.location, 1 )
			
			return new $mol_3d_buffer( this.api, buffer )
			
		}
		
		@ $mol_mem_key
		vectors_uint( vals: number ) {
			
			const buffer = this.api.createBuffer()!
			this.api.bindBuffer( this.api.ARRAY_BUFFER, buffer )
			
			this.api.enableVertexAttribArray( this.location )
			this.api.vertexAttribPointer( this.location, vals, this.api.UNSIGNED_INT, false, 0, 0 )
			this.api.vertexAttribDivisor( this.location, 1 )
			
			return new $mol_3d_buffer( this.api, buffer )
			
		}
		
		@ $mol_mem_key
		matrix( [ cols, rows ]: [ number, number ] ) {
			
			const matrix_size = rows * cols * float_size
			
			const buffer = this.api.createBuffer()!
			this.api.bindBuffer( this.api.ARRAY_BUFFER, buffer )
			
			for( let row = 0; row < rows; ++ row ) {
				
				const loc = this.location + row
				const offset = row * cols * float_size
				
				this.api.enableVertexAttribArray( loc )
				this.api.vertexAttribPointer( loc, cols, this.api.FLOAT, false, matrix_size, offset )
				
			}
			
			return new $mol_3d_buffer( this.api, buffer )
			
		}
		
		@ $mol_mem_key
		matrices( [ cols, rows ]: [ number, number ] ) {
			
			const matrix_size = rows * cols * float_size
			
			const buffer = this.api.createBuffer()!
			this.api.bindBuffer( this.api.ARRAY_BUFFER, buffer )
			
			for( let row = 0; row < rows; ++ row ) {
				
				const loc = this.location + row
				const offset = row * cols * float_size
				
				this.api.enableVertexAttribArray( loc )
				this.api.vertexAttribPointer( loc, cols, this.api.FLOAT, false, matrix_size, offset )
				this.api.vertexAttribDivisor( loc, 1 )
				
			}
			
			return new $mol_3d_buffer( this.api, buffer )
			
		}
		
	}
	
}