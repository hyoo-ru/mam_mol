namespace $ {
	
	export class $mol_picture extends Object {
		
		constructor(
			readonly native: HTMLCanvasElement
		) {
			super()
		}
		
		@ $mol_action
		static fit(
			image: CanvasImageSource | Blob | string,
			limit: { width: number, height: number },
		) {
			
			if( image instanceof Blob ) image = $mol_wire_sync( URL ).createObjectURL( image )
			if( typeof image === 'string' ) image = $mol_wire_sync( this ).load( image ) 
			
			let { width, height } = this.sizes( image )
			
			if( width > limit.width ) {
				height *= limit.width / width
				width = limit.width
			}
			
			if( height > limit.height ) {
				width *= limit.height / height
				height = limit.height
			}
			
			return this.make( image, { width, height } )
			
		}
		
		static make(
			image: CanvasImageSource,
			size: { width: number, height: number },
		) {
			
			const canvas = $mol_dom_context.document.createElement( 'canvas' )
			Object.assign( canvas, size )
			
			const context = canvas.getContext( '2d' )!
			context.drawImage( image, 0, 0, size.width, size.height )
		
			return new this( canvas )
		}
		
		static sizes( image: CanvasImageSource ) {
		
			let { width, height } = image
			
			if( typeof width !== 'number' ) width = width.baseVal.value
			if( typeof height !== 'number' ) height = height.baseVal.value
			
			return { width, height }
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
				done => this.native.toBlob( done, type, quality )
			) as any as Blob | null
		}
		
	}
	
}