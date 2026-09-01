namespace $ {
	
	export class $mol_3d_image extends $mol_object {
		
		uri() {
			return 'about:blank'
		}
		
		load() {
			
			return new Promise< HTMLImageElement >( ( done, fail )=> {
				const image = new Image
				image.src = this.uri()
				image.onload = ()=> done( image )
				image.onerror = event => fail( event )
			} )
			
		}
		
		@ $mol_mem
		data() {
			
			$mol_wire_solid()
			
			try {
				
				return $mol_wire_sync( this as $mol_3d_image ).load()
				
			} catch( error ) {
				
				$mol_fail_log( error )
				
				return new ImageData(
					new Uint8ClampedArray( 512 * 512 * 4 ),
					512,
					512,
				)
				
			}
			
		}
		
	}
	
}