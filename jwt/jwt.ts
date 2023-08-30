namespace $ {

	function decode_base64(base64: string): string {
		return $mol_charset_decode($mol_base64_decode(base64.replace(/-/g, '+').replace(/_/g, '/')))
	}

	export function $mol_jwt_decode(raw: string) {
		let line = 'split'
		try {
			const [ headers_raw, payload_raw ] = raw.split('.')
			if (! payload_raw) throw new Error(`No second chunk, splitted by "." in token`)

			line = 'decode payload'
			const payload_str = decode_base64(payload_raw)
			line = 'parse payload'
			const payload = JSON.parse(payload_str)
			line = 'decode headers'
			const headers_str = decode_base64(headers_raw)
			line = 'parse headers'
			const headers = JSON.parse(headers_str)

			return { payload, headers }
		} catch (e) {
			if ($mol_promise_like(e)) return $mol_fail_hidden(e)

			if (e instanceof Error) {
				if (!e.cause) e.cause = {} as { raw?: string }

				(e.cause as { raw?: string}).raw = raw

				Object.defineProperty(e, 'message', {
					value: `${e.message}, ${line} error`
				})
			}

			$mol_fail_hidden(e)
		}
	}
}
