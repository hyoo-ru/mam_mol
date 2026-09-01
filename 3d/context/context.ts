namespace $ {
	
	export class $mol_3d_context extends Object {
		
		constructor(
			readonly native: WebGL2RenderingContext,
		) {
			super()
		}
		
		shader( type: GLenum, code: string ) {
			// console.log( 'shader', code )
			const gl = this.native
			const shader = gl.createShader( type )!
			
			gl.shaderSource( shader, code )
			gl.compileShader( shader )
			
			const ok = gl.getShaderParameter( shader, gl.COMPILE_STATUS )
			if( ok ) return shader
			
			const log = gl.getShaderInfoLog( shader )
			gl.deleteShader( shader )
			
			throw new Error( String( log ) )
		}
		
		func< Face extends $mol_3d_program_face >(
			name: string,
			face: Face,
		) {
			return this.program( face,
				$mol_3d_glsl_both + $mol_3d_glsl_vert + `void main() { ${name}(); }`,
				$mol_3d_glsl_both + $mol_3d_glsl_frag + `void main() { ${name}(); }`,
			)
		}
		
		program< Face extends $mol_3d_program_face >(
			face: Face,
			vertex: string,
			fragment: string,
		) {
			
			const gl = this.native
			const program = gl.createProgram()!
			
			const prefix = `#version 300 es
				precision highp float;
				precision highp sampler2D;
				precision highp sampler2DArray;
			`
			
			let revert = prefix
			let refrag = prefix
			
			for( const name in face.glob ?? {} ) {
				revert += `uniform ${ face.glob![name] } ${name};\n`
				refrag += `uniform ${ face.glob![name] } ${name};\n`
			}
			
			for( const name in face.input ?? {} ) {
				revert += `in ${ face.input![name] } ${name};\n`
			}
			
			for( const name in face.pipe ?? {} ) {
				revert += `out ${ face.pipe![name] } ${name};\n`
				refrag += `in ${ face.pipe![name] } ${name};\n`
			}
			
			for( const name in face.output ?? {} ) {
				refrag += `out ${ face.output![name] } ${name};\n`
			}
			
			gl.attachShader( program, this.shader( gl.VERTEX_SHADER, revert + vertex ) )
			gl.attachShader( program, this.shader( gl.FRAGMENT_SHADER, refrag + fragment ) )
			gl.linkProgram( program )
			
			var ok = gl.getProgramParameter( program, gl.LINK_STATUS )
			if( ok ) return new $mol_3d_program< Face >( this.native, program )
		  
			const log = gl.getProgramInfoLog( program )
			gl.deleteProgram( program )
			
			throw new Error( String( log ) )
	  	}
		
	}
	
}
