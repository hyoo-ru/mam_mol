namespace $ {
	const TextDecoder = globalThis.TextDecoder ?? $node.util.TextDecoder

	// @see https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/encoding
	export type $mol_charset_encoding = 'utf8' | 'ibm866' | 'iso-8859-2' | 'iso-8859-3' | 'iso-8859-4' | 'iso-8859-5' | 'iso-8859-6'
		| 'iso-8859-7' | 'iso-8859-8' | 'iso-8859-8i' | 'iso-8859-10' | 'iso-8859-13' | 'iso-8859-14' | 'iso-8859-15' | 'iso-8859-16'
		| 'koi8-r' | 'koi8-u' | 'koi8-r' | 'macintosh' | 'windows-874' | 'windows-1250' | 'windows-1251' | 'windows-1252' | 'windows-1253'
		| 'windows-1254'| 'windows-1255'| 'windows-1256'| 'windows-1257'| 'windows-1258' | 'x-mac-cyrillic' | 'gbk'
		| 'gb18030' | 'hz-gb-2312' | 'big5' | 'euc-jp' | 'iso-2022-jp' | 'shift-jis' | 'euc-kr' | 'iso-2022-kr'

	export function $mol_charset_decode(value: Uint8Array, code: $mol_charset_encoding = 'utf8') {
		return new TextDecoder(code).decode(value)
	}

}
