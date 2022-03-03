namespace $ {
	
	export let $mol_report_bugsnag = ''
	
	globalThis.onerror = function( msg, url, line, col, err ) {
		
		const doc = $mol_dom_context.document
		
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
					locale: $mol_dom_context.navigator.language,
					userAgent: $mol_dom_context.navigator.userAgent,
					time: new Date().toISOString(),
				},
				context: doc?.activeElement?.id,
				exceptions: [{
					message: err?.message || err || msg,
					errorClass: err?.constructor.name,
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
					url: doc?.location.href,
					referer: doc?.referrer,
				},
			}],
		}
		
		if( $mol_dom_context.location.hostname === 'localhost' ) {
			
			console.debug( 'Error report', report )
			
		} else {
		
			fetch( 'https://notify.bugsnag.com/', {
				method: 'post',
				body: JSON.stringify( report ),
			} ).catch( ()=> null )
			
		}
		
	}
	
	globalThis.onunhandledrejection = function( event ) {
		globalThis.onerror!( 'Unhandled Rejection', '', 0, 0, event.reason )
	} 
	
	const error = console.error
	console.error = function( ... args ) {
		globalThis.onerror!( 'Logged Error', '', 0, 0, arguments[0] )
		error.apply( console, args )
	}
	
}
