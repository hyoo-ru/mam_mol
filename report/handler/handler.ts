namespace $ {

	type Error_handler = (event: Event | string, url?: string, line?: number, col?: number, error?: Error) => void

	export const $mol_report_handler_all = new Set<Error_handler>()

	function handler(event: Event | string, url?: string, line?: number, col?: number, error?: Error) {
		for (const handler of $mol_report_handler_all) {
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

		const format = (val: unknown) => typeof val === 'string'
			? val.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')
			: JSON.stringify(val)

		let secondary = args.slice(1)
		const first = typeof args[0] === 'string'
			? args[0].replaceAll( /%(?:\.\d+)?[disfcoO]/g, spec => spec === '%c' ? (secondary.shift(), '') : secondary.shift() )
			: args[0]

		secondary.unshift(first)
		let result = secondary.map(val => format(val)).join(' ')

		handler( result )
		console_error.apply( console, args )
	}

}
