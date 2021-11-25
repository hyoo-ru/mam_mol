namespace $ {
	
	export let $mol_report_bugsnag = ''
	
	globalThis.onerror = function( msg, url, line, col, err ) {
		
		const el = document.activeElement
		
		const report = {
			apiKey: $mol_report_bugsnag,
			payloadVersion: 5,
			notifier: {
				name: '$mol_report_bugsnag',
				version: '1',
				url: '$mol_report_bugsnag',
			},
			events: [{
				device: {
					locale: navigator.language,
					userAgent: navigator.userAgent,
					time: new Date().toISOString(),
				},
				context: el && el.id,
				exceptions: [{
					message: err && err.message || err || msg,
					errorClass: err && err.constructor.name,
					stacktrace: [{
						columnNumber: col,
						file: url,
						lineNumber: line,
						method: '',
					}],
				}],
				metaData: {
					stack: err && err.stack,
				},
				request: {
					url: document.location.href,
					referer: document.referrer,
				},
			}],
		}
		
		if( location.hostname === 'localhost' ) {
			
			console.debug( 'Error report', report )
			
		} else {
		
			fetch( 'https://notify.bugsnag.com/', {
				method: 'post',
				body: JSON.stringify( report ),
			} )
			
		}
		
	}
	
	globalThis.onunhandledrejection = function( event ) {
		globalThis.onerror!( 'Unhandled Rejection', '', 0, 0, event.reason )
	} 
	
	const error = console.error
	console.error = function( ... args ) {
		error.apply( console, args )
		globalThis.onerror!( 'Logged Error', '', 0, 0, arguments[0] )
	}
	
}
