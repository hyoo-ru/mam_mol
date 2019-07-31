/** @jsx $mol_jsx_make */
namespace $ {

	@ $mol_class
	export class $mol_fiber_demo extends $mol_object2 {

		@ $mol_fiber_solid.method
		static step( sandbox : HTMLElement ) {
			if( Math.random() > .999 ) throw new Error( 'Test error' )
			sandbox.appendChild( <video /> )
		}
	
		static now = $mol_fiber.func( Date.now )

		@ $mol_fiber.method
		static walk( sandbox : HTMLElement ) {
			try {
				
				let start = this.now()
				for( let i = 0 ; i < 200 ; ++i ) this.step( sandbox )
				sandbox.innerText = String( Date.now() - start )
	
			} catch( error ) {
				if( 'then' in error ) $mol_fail_hidden( error )
	
				sandbox.innerText = error.message
				$mol_fail_hidden( error )
			}
		}
	
		static red_task() { this.walk( document.getElementById( 'red' )! ) }
		static green_task() { this.walk( document.getElementById( 'green' )! ) }
		static blue_task() { this.walk( document.getElementById( 'blue' )! ) }

		static load = $mol_fiber_sync( async uri =>( await fetch( uri ) ).text() )
	
		static load_source() {
			document.getElementById( 'source' )!.innerText += ' ' + this.load( 'index.html' ).length
		}

		static loading : $mol_fiber

		static run() {

			if( this.loading ) this.loading.destructor()
			this.loading = $mol_fiber_defer( ()=> this.load_source() )
			
			$mol_fiber_defer( ()=> this.red_task() )
			$mol_fiber_defer( ()=> this.green_task() )
			$mol_fiber_defer( ()=> this.blue_task() )
			
		}
		
	}

}
