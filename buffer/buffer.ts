namespace $ {

	export type $mol_buffer_encoding = 'utf8' | 'base64'
	export type $mol_buffer_encoding_full = $mol_buffer_encoding | 'ibm866' | 'iso-8859-2' | 'iso-8859-3' | 'iso-8859-4' | 'iso-8859-5' | 'iso-8859-6'
		| 'iso-8859-7' | 'iso-8859-8' | 'iso-8859-8i' | 'iso-8859-10' | 'iso-8859-13' | 'iso-8859-14' | 'iso-8859-15' | 'iso-8859-16'
		| 'koi8-r' | 'koi8-u' | 'koi8-r' | 'macintosh' | 'windows-874' | 'windows-1250' | 'windows-1251' | 'windows-1252' | 'windows-1253'
		| 'windows-1254'| 'windows-1255'| 'windows-1256'| 'windows-1257'| 'windows-1258' | 'x-mac-cyrillic' | 'gbk'
		| 'gb18030' | 'hz-gb-2312' | 'big5' | 'euc-jp' | 'iso-2022-jp' | 'shift-jis' | 'euc-kr' | 'iso-2022-kr' | 'utf-16be' | 'utf-16le'
		| 'x-user-defined' | 'replacement'

	const TextEncoder = globalThis.TextEncoder ?? $node.util.TextEncoder
	const TextDecoder = globalThis.TextDecoder ?? $node.util.TextDecoder

	const encoder = new TextEncoder()

	export class $mol_buffer extends Uint8Array {

		static create(value: string | Uint8Array, code: $mol_buffer_encoding = 'utf8') {
			if (typeof value === 'string') {
				if (code === 'base64') value = $mol_base64_decode(value)
				else value = encoder.encode(value)
			}

			return new $mol_buffer((value as Uint8Array).buffer, (value as Uint8Array).byteOffset, (value as Uint8Array).byteLength)
		}

		toString(code: $mol_buffer_encoding_full = 'utf8'): string {
			if (code === 'base64') return $mol_base64_encode(this)

			return new TextDecoder(code).decode(this)
		}
	}

	$mol_conform_handler( $mol_buffer , ( target, source ) => {
		const equal = $mol_compare_bytes(target, source)
		return equal ? source : target
	} )
}
