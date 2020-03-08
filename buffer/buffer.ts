namespace $ {

	export type $mol_buffer_encoding = 'utf8' | 'base64'

	const encoder = new TextEncoder()
	const decoder = new TextDecoder('utf8')

	export class $mol_buffer extends $mol_object2 {
		readonly original: Uint8Array

		get length() {
			return this.original.length
		}

		static from(value: string | Uint8Array | ArrayBuffer, code: $mol_buffer_encoding = 'utf8') {
			return $mol_buffer.create(t => {
				if (typeof value === 'string') {
					if (code === 'base64') t.original = $mol_base64_decode(value)
					else t.original = encoder.encode(value)
				} else t.original = new Uint8Array(value)
			})
		}

		toString(code: $mol_buffer_encoding = 'utf8') {
			if (code === 'base64') return $mol_base64_encode(this.original)

			return decoder.decode(this.original)
		}
	}
}
