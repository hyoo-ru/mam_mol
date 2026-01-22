namespace $ {

	type Error_handler = (event: Event | string, url?: string, line?: number, col?: number, error?: Error) => void

	let handlers = [] as Error_handler[]

	function handler(event: Event | string, url?: string, line?: number, col?: number, error?: Error) {
		for (const handler of handlers) {
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

	export function $mol_report_handler_add(handler: Error_handler) {
		handlers.push(handler)
	}

	export function $mol_report_handler_remove(handler: Error_handler) {
		handlers = handlers.filter(target => target !== handler)
	}

}
