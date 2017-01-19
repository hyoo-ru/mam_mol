namespace $ {
	
	let nativeAlert = window.alert
	export function alert( message : string ) {
		console.warn( 'Alerts causes atom synchronization problems in IE. Use custom notificator instead.' )
		return nativeAlert( message )
	}

	let nativeConfirm = window.confirm
	export function confirm( question : string ) {
		console.warn( 'Confirms causes atom synchronization problems in IE. Use custom dialog instead.' )
		return nativeConfirm( question )
	}
	
	let nativePrompt = window.prompt
	export function prompt( question : string , def = '' ) {
		console.warn( 'Prompts causes atom synchronization problems in IE. Use custom dialog instead.' )
		return nativePrompt( question , def )
	}

}
