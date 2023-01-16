namespace $ {
	
	export class $mol_3d_texture extends $mol_object {
		
		constructor(
			readonly api: WebGL2RenderingContext,
			readonly native = api.createTexture()!,
		) {
			super()
		}
		
		destructor() {
			this.api.deleteTexture( this.native )
		}
		
		fill(
			color: Uint8Array,
		) {
			
			this.api.bindTexture( this.api.TEXTURE_2D, this.native )
			
			this.api.texImage2D(
				this.api.TEXTURE_2D,
				0, // level
				this.api.RGBA, // internal
				1, // width
				1, // height
				0, // border
				this.api.RGBA, // native
				this.api.UNSIGNED_BYTE,
				color,
			)
			
			return color
		}
		
		send_one(
			data: TexImageSource
		) {
			
			this.api.bindTexture( this.api.TEXTURE_2D, this.native )
			
			this.api.texImage2D(
				this.api.TEXTURE_2D,
				0, // level
				this.api.RGBA, // internal
				this.api.RGBA, // native
				this.api.UNSIGNED_BYTE,
				data,
			)
			
			this.api.texParameteri( this.api.TEXTURE_2D, this.api.TEXTURE_MIN_FILTER, this.api.LINEAR_MIPMAP_LINEAR )
			this.api.texParameteri( this.api.TEXTURE_2D, this.api.TEXTURE_MAG_FILTER, this.api.LINEAR )
			
			this.api.generateMipmap( this.api.TEXTURE_2D )
			
			return data
		}
		
		send_multi(
			data: TexImageSource[]
		) {
			
			this.api.bindTexture( this.api.TEXTURE_2D_ARRAY, this.native )
			
			const size = data[0].width
			
			this.api.texImage3D(
				this.api.TEXTURE_2D_ARRAY,
				0,
				this.api.RGBA,
				size,
				size,
				data.length,
				0,
				this.api.RGBA,
				this.api.UNSIGNED_BYTE,
				null,
			)
			
			for( let i = 0; i < data.length; ++i ) {
				
				this.api.texSubImage3D(
					this.api.TEXTURE_2D_ARRAY,
					0, // level
					0, // x
					0, // y
					i, // z
					size,
					size,
					1, // depth
					this.api.RGBA,
					this.api.UNSIGNED_BYTE,
					data[i],
				)
				
			}
			
			const anisotropic = this.api.getExtension( 'EXT_texture_filter_anisotropic' ) as any
			const max = this.api.getParameter( anisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT )
			this.api.texParameterf( this.api.TEXTURE_2D_ARRAY, anisotropic.TEXTURE_MAX_ANISOTROPY_EXT, max )
			
			this.api.texParameteri( this.api.TEXTURE_2D_ARRAY, this.api.TEXTURE_MIN_FILTER, this.api.LINEAR_MIPMAP_LINEAR )
			this.api.texParameteri( this.api.TEXTURE_2D_ARRAY, this.api.TEXTURE_MAG_FILTER, this.api.LINEAR )
			
			this.api.pixelStorei( this.api.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true )
			this.api.blendFunc( this.api.ONE, this.api.ONE_MINUS_SRC_ALPHA )
			
			this.api.generateMipmap( this.api.TEXTURE_2D_ARRAY )
			
			return data
		}
		
	}
	
}
