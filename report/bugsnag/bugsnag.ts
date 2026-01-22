namespace $ {
	
	export let $mol_report_bugsnag = ''
	
	function report(msg: Event | string, url?: string, line?: number, col?: number, err?: Error) {
		
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

	$mol_report_handler_add(report)
	
}
