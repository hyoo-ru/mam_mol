namespace $ {

	function $mol_base64_uint_to_binary(bytes: Uint8Array): string {
		let binary = ''

		for (const byte of bytes) {
			binary += String.fromCharCode( byte )
		}

		return binary
	}

	export class $mol_base64_web extends $mol_base64 {
		static encode(str: string | Uint8Array): string {
			return $mol_dom_context.btoa(typeof str === 'string' ? str : $mol_base64_uint_to_binary(str))
		}
	
		static decode(base64Str: string): Uint8Array {
			// @see https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string
			return new Uint8Array($mol_dom_context.atob(base64Str).split('').map(c => c.charCodeAt(0)))
		}
	}

	$.$mol_base64 = $mol_base64_web
}
