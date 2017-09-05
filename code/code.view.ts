namespace $.$$ {
	export class $mol_code extends $.$mol_code {
		
		scan_support() {
			return Boolean( $mol_cordova.plugins.barcodeScanner ) 
		}
		
		Scan() {
			return this.scan_support() ? super.Scan() : null 
		}
		
		event_scan() {
			$mol_cordova.plugins.barcodeScanner.scan(
				( result : { cancelled : boolean , text : string } )=> {
					if( result.cancelled ) return
					this.value( result.text )
				} ,
				( error : Error )=> {
					alert( "Scanning failed: " + error )
				}
			);
		}
		
	}
}
