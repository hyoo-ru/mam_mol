var $mol_cordova = window[ 'cordova' ] || { plugins : {
	barcodeScanner : null
} }

function $mol_cordova_camera() {
	return navigator['camera']
}
