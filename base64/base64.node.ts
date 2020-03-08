namespace $ {
	export class $mol_base64_node extends $mol_base64 {

		static encode(str: string | Uint8Array): string {
			if (! str) return ''
			if (Buffer.isBuffer(str)) return str.toString('base64')
			if ( typeof str === 'object' ) throw new Error('Not supported Uint8Array to base64')

			return new Buffer(str).toString('base64')
		}

		static decode(str: string): Uint8Array {
			return new Buffer(str, 'base64')
		}	
	}

	$.$mol_base64 = $mol_base64_node
}
