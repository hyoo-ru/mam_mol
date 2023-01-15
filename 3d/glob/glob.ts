namespace $ {

	export class $mol_3d_glob extends Object {
		
		constructor(
			readonly api: WebGL2RenderingContext,
			readonly location: WebGLUniformLocation,
		) {
			super()
		}
		
		vector_int(
			data: Int32List,
			offset = 0,
			length = data.length - offset,
		) {
			switch( length ) {
				case 4: this.api.uniform4iv( this.location, data, offset, length ); break
				case 3: this.api.uniform3iv( this.location, data, offset, length ); break
				case 2: this.api.uniform2iv( this.location, data, offset, length ); break
				case 1: this.api.uniform1iv( this.location, data, offset, length ); break
				default: throw new Error( `Wrong matrix data length (${ length })` )
			}
			return data
		}
		
		vector_uint(
			data: Int32List,
			offset = 0,
			length = data.length - offset,
		) {
			switch( length ) {
				case 4: this.api.uniform4uiv( this.location, data, offset, length ); break
				case 3: this.api.uniform3uiv( this.location, data, offset, length ); break
				case 2: this.api.uniform2uiv( this.location, data, offset, length ); break
				case 1: this.api.uniform1uiv( this.location, data, offset, length ); break
				default: throw new Error( `Wrong matrix data length (${ length })` )
			}
			return data
		}
		
		vector_float(
			data: Float32List,
			offset = 0,
			length = data.length - offset,
		) {
			switch( length ) {
				case 4: this.api.uniform4fv( this.location, data, offset, length ); break
				case 3: this.api.uniform3fv( this.location, data, offset, length ); break
				case 2: this.api.uniform2fv( this.location, data, offset, length ); break
				case 1: this.api.uniform1fv( this.location, data, offset, length ); break
				default: throw new Error( `Wrong matrix data length (${ length })` )
			}
			return data
		}
		
		matrix(
			data: Float32List,
			transpose = false,
			offset = 0,
			length = data.length - offset,
		) {
			switch( length ) {
				case 16: this.api.uniformMatrix4fv( this.location, transpose, data, offset, length ); break
				case 12: this.api.uniformMatrix4x3fv( this.location, transpose, data, offset, length ); break
				case 9: this.api.uniformMatrix3fv( this.location, transpose, data, offset, length ); break
				case 8: this.api.uniformMatrix4x2fv( this.location, transpose, data, offset, length ); break
				case 6: this.api.uniformMatrix3x2fv( this.location, transpose, data, offset, length ); break
				case 2: this.api.uniformMatrix2fv( this.location, transpose, data, offset, length ); break
				default: throw new Error( `Wrong matrix data length (${ length })` )
			}
			return data
		}
		
		@ $mol_mem
		texture() {
			return new $mol_3d_texture( this.api )
		}
		
	}

}