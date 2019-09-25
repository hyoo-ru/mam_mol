var cordova : any

namespace $ {
	
	export var $mol_cordova = cordova || {
		plugins : {
			barcodeScanner : null
		}
	}
	
	export function $mol_cordova_camera() {
		return ( navigator as any )[ 'camera' ]
	}
	
}
