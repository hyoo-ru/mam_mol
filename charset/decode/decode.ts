namespace $ {

	const decoders = {} as { [ key in $mol_charset_encoding ]?: TextDecoder }

	export function $mol_charset_decode(
		buffer: AllowSharedBufferSource,
		encoding: $mol_charset_encoding = 'utf8',
	) {
		
		let decoder = decoders[ encoding ]
		if( !decoder ) decoder = decoders[ encoding ] = new TextDecoder( encoding )
		
		return decoder.decode( buffer )
	}

}
