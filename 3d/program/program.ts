namespace $ {
	
	type Type =
		| 'mat4' | 'mat3' | 'mat2'
		| 'vec4' | 'vec3' | 'vec2'
		| 'ivec4' | 'ivec3' | 'ivec2'
		| 'uvec4' | 'uvec3' | 'uvec2'
		| 'float' | 'int' | 'uint'
		| 'sampler2D' | 'sampler2DShadow'
		| 'sampler2DArray' | 'sampler2DArrayShadow'
		| 'samplerCube' | 'samplerCubeShadow'
		| 'sampler3D'
	
	export type $mol_3d_program_face = {
		glob?: Record< string, Type >,
		input?: Record< string, Type >,
		pipe?: Record< string, Type >,
		output?: Record< string, Type >,
	}
	
	export class $mol_3d_program< Face extends $mol_3d_program_face > extends Object {
		
		constructor(
			readonly api: WebGL2RenderingContext,
			readonly native: WebGLProgram,
		) {
			api.enable( api.CULL_FACE ) // hide back sides
			api.enable( api.DEPTH_TEST ) // order indepenent overlap
			api.enable( api.SCISSOR_TEST ) // allow partial render
			api.enable( api.BLEND ) // allow texture alpha
			super()
		}
		
		@ $mol_mem_key
		glob( name: keyof Face[ 'glob' ] ) {
			const location = this.api.getUniformLocation( this.native, name as string )!
			return new $mol_3d_glob( this.api, location )
		}
		
		// @ $mol_mem_key
		param( name: keyof Face[ 'input' ] ) {
			
			const location = this.api.getAttribLocation( this.native, name as string )
			if( location === -1 ) return null
			
			return new $mol_3d_param( this.api, location )
			
		}
		
		@ $mol_mem_key
		geometry( id: any ): $mol_3d_geometry {
			return new $mol_3d_geometry( this.api )
		}
		
		use( task: ( geometry: $mol_3d_program< Face > )=> void ) {
			
			try {
				
				this.api.useProgram( this.native )
				task( this )
				return this
				
			} finally {
				this.api.useProgram( null )
			}
			
		}
		
		point( size: number, offset = 0 ) {
			this.api.drawArrays( this.api.POINTS, offset, size )
		}
		
		line( size: number, offset = 0 ) {
			this.api.drawArrays( this.api.LINES, offset, size )
		}
		
		triangle( size: number, offset = 0 ) {
			this.api.drawArrays( this.api.TRIANGLES, offset, size )
		}
		
		strip( size: number, offset = 0 ) {
			this.api.drawArrays( this.api.TRIANGLE_STRIP, offset, size )
		}
		
		points( first: number, vertices: number, instances = 1 ) {
			this.api.drawArraysInstanced( this.api.POINTS, first, vertices, instances )
		}
		
		lines( first: number, vertices: number, instances = 1 ) {
			this.api.drawArraysInstanced( this.api.LINE_STRIP, first, vertices, instances )
		}
		
		strips( first: number, vertices: number, instances = 1 ) {
			this.api.drawArraysInstanced( this.api.TRIANGLE_STRIP, first, vertices, instances )
		}
		
	}
	
}
