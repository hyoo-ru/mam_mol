namespace $ {
	
	/** Image processing. */
	export class $mol_picture extends Object {
		
		constructor(
			readonly canvas: HTMLCanvasElement
		) {
			super()
		}
		
		get context() {
			return this.canvas.getContext( '2d' )
		}
		
		@ $mol_action
		static fit(
			image: CanvasImageSource | Blob | string,
			width = Number.POSITIVE_INFINITY,
			height = width,
		) {
			
			if( image instanceof Blob ) image = $mol_wire_sync( URL ).createObjectURL( image )
			if( typeof image === 'string' ) image = $mol_wire_sync( this ).load( image ) 
			
			let [ w, h ] = this.sizes( image )
			
			if( w > width ) {
				h *= width / w
				w = width
			}
			
			if( h > height ) {
				w *= height / h
				h = height
			}
			
			return this.make( image, w, h )
			
		}
		
		static make(
			image: CanvasImageSource,
			width: number,
			height = width,
		) {
			
			const canvas = $mol_dom_context.document.createElement( 'canvas' )
			Object.assign( canvas, { width, height } )
			
			const context = canvas.getContext( '2d' )!
			context.drawImage( image, 0, 0, width, height )
		
			return new this( canvas )
		}
		
		static sizes( image: Exclude< CanvasImageSource, VideoFrame > ) {
		
			if( image instanceof HTMLVideoElement ) return [
				image.videoWidth,
				image.videoHeight,
			]
			
			if( image instanceof SVGImageElement ) return [
				image.width.baseVal.value,
				image.height.baseVal.value,
			]
				
			return [
				image.width,
				image.height,
			]
			
		}
		
		static async load( uri: string ) {
			
			const image = new Image
			image.src = uri
			
			await new Promise(
				( onload, onerror )=> Object.assign( image, { onload, onerror } )
			)
			
			return image
		}
		
		@ $mol_action
		format(
			type: 'image/png' | 'image/jpeg' | 'image/webp',
			quality = .9,
		) {
			return new Promise(
				done => this.canvas.toBlob( done, type, quality )
			) as any as Blob | null
		}
		
	}
	
}
