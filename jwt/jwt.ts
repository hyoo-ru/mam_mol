namespace $ {
	export class $mol_jwt extends $mol_object {
		decode(raw: string): unknown {
			let line = 'split'
			try {
				const token = raw.split('.')[1]
				if (! token) throw new Error(`No second chunk, splitted by "." in token`)

				line = 'decode'
				const str = this.$.$mol_base64_decode_string(token)

				line = 'parse'
				return JSON.parse(str)
			} catch (e) {
				if ($mol_promise_like(e)) return $mol_fail_hidden(e)

				if (e instanceof Error) {
					if (!e.cause) e.cause = {} as { raw?: string }

					(e.cause as { raw?: string}).raw = raw

					e.message += `, ${line} error`
				}

				$mol_fail_hidden(e)
			}
		}
	}
}
