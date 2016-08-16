module $.$mol {
	export class $mol_coder extends $.$mol_coder {
		
		supportScan() {
			return Boolean( $mol_cordova.plugins.barcodeScanner ) 
		}
		
		scanner() {
			return this.supportScan() ? super.scanner() : null 
		}
		
		eventScan() {
			$mol_cordova.plugins.barcodeScanner.scan(
				result => {
					if( result.cancelled ) return
					this.value( result.text )
				} ,
				error => {
					alert( "Scanning failed: " + error )
				}
			);
		}
		
	}
}
