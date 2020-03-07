namespace $ {
	export abstract class $mol_base64 {
		static decoder = new TextDecoder('utf8')

		static encode(src: string | Uint8Array): string {
			throw new Error('Not implemented')
		}
		static decode(base64: string): Uint8Array {
			throw new Error('Not implemented')
		}

		static ensure_string(src: string | Uint8Array): string {
			return typeof src === 'string' ? src : this.decoder.decode(src)
		}	
	}
}
