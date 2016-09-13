var $mol_cordova = (<any>window)[ 'cordova' ] || { plugins : {
	barcodeScanner : null
} }

function $mol_cordova_camera() {
	return (<any>navigator)['camera']
}
