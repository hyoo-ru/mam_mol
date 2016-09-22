var $mol_cordova = (<any>this)[ 'cordova' ] || { plugins : {
	barcodeScanner : null
} }

function $mol_cordova_camera() {
	return (<any>navigator)['camera']
}
