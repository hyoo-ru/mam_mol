namespace $ {

	export class $mol_base64_node extends $mol_base64 {

		static encode(str: string | Uint8Array): string {
			if (! str) return ''
			return Buffer.from(str).toString('base64')
		}

		static decode(base64Str: string): Uint8Array {
			return Buffer.from(base64Str, 'base64')
		}
	}

	$.$mol_base64 = $mol_base64_node
}
