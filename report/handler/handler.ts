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
		const chunks = typeof args[0] !== 'string' ? [] : args[0].split(/(%(?:\.\d+)?[disfcoO])/)

		let result = chunks.length ? '' : JSON.stringify(args)

		for (let i = 0, spec_index = 0; i < chunks.length; i++) {
			const [, num, specifier] = chunks[i].match(/%(?:\.(\d+))?([disfcoO])/) ?? []
			let val = specifier ? args[++spec_index] : chunks[i]

			// strip ansi from node formatted string
			val = val.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')

			if (specifier === 'c') val = ''
			if (specifier === 'f' || specifier === 'd' || specifier === 'i') val = Number(val).toFixed(Number(num || 0))
			if (specifier === 'o' || specifier === 'O') val = JSON.stringify(val)

			result += val
		}

		handler( result )
		console_error.apply( console, args )
	}

}
