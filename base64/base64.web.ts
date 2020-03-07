namespace $ {
	export class $mol_base64_web extends $mol_base64 {
		static encode(str: string | Uint8Array): string {
			return $mol_dom_context.btoa(this.ensure_string(str))
		}
	
		static decode(base64: string): Uint8Array {
			// @see https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string
			return new Uint8Array($mol_dom_context.atob(base64).split('').map(c => c.charCodeAt(0)))
		}
	}

	$.$mol_base64 = $mol_base64_web
}
