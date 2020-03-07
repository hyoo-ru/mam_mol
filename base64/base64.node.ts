namespace $ {
	export class $mol_base64_node extends $mol_base64 {

		static encode(str: string | Uint8Array): string {
			if (! str) return ''
			if (str instanceof Buffer) return str.toString('base64')

			return new Buffer(this.ensure_string(str)).toString('base64')
		}

		static decode(str: string): Uint8Array {
			return new Buffer(str, 'base64')
		}	
	}

	$.$mol_base64 = $mol_base64_node
}
