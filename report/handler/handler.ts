namespace $ {

	type Error_handler = (event: Event | string, url?: string, line?: number, col?: number, error?: Error) => void

	export const $mol_report_handler_set = new Set<Error_handler>()

	function handler(event: Event | string, url?: string, line?: number, col?: number, error?: Error) {
		for (const handler of $mol_report_handler_set) {
			try {
				handler(event, url, line, col, error)
			} catch (e) {}
		}
	}
	const handler_promise = (event: PromiseRejectionEvent) => handler('Unhandled Rejection', '', 0, 0, event.reason )

	globalThis.addEventListener('error', handler)
	globalThis.addEventListener('unhandledrejection', handler_promise)

	const console_error = console.error
	console.error = function console_error_custom( ... args ) {
		handler( 'Logged Error', '', 0, 0, arguments[0] )
		console_error.apply( console, args )
	}

}
