namespace $ {

	export type $mol_buffer_encoding = 'utf8' | 'base64'
	export type $mol_buffer_encoding_full = $mol_buffer_encoding | 'ibm866' | 'iso-8859-2' | 'iso-8859-3' | 'iso-8859-4' | 'iso-8859-5' | 'iso-8859-6'
		| 'iso-8859-7' | 'iso-8859-8' | 'iso-8859-8i' | 'iso-8859-10' | 'iso-8859-13' | 'iso-8859-14' | 'iso-8859-15' | 'iso-8859-16'
		| 'koi8-r' | 'koi8-u' | 'koi8-r' | 'macintosh' | 'windows-874' | 'windows-1250' | 'windows-1251' | 'windows-1252' | 'windows-1253'
		| 'windows-1254'| 'windows-1255'| 'windows-1256'| 'windows-1257'| 'windows-1258' | 'x-mac-cyrillic' | 'gbk'
		| 'gb18030' | 'hz-gb-2312' | 'big5' | 'euc-jp' | 'iso-2022-jp' | 'shift-jis' | 'euc-kr' | 'iso-2022-kr' | 'utf-16be' | 'utf-16le'
		| 'x-user-defined' | 'replacement'

	const encoder = new TextEncoder()

	export class $mol_buffer extends $mol_object2 {
		original: Uint8Array

		get length() {
			return this.original.length
		}

		static from(value: string | Uint8Array, code: $mol_buffer_encoding = 'utf8') {
			return $mol_buffer.create(t => {
				if (typeof value === 'string') {
					if (code === 'base64') t.original = $mol_base64_decode(value)
					else t.original = encoder.encode(value)
				} else t.original = value
			})
		}

		toString(code: $mol_buffer_encoding_full = 'utf8') {
			if (code === 'base64') return $mol_base64_encode(this.original)

			return new TextDecoder(code).decode(this.original)
		}
	}

	$mol_conform_handler( $mol_buffer , ( target, source ) => {
		const original = $mol_conform_array(target.original, source.original)
		return original !== source.original ? target : source
	} )
}
