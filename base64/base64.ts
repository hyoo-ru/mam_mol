namespace $ {
	export abstract class $mol_base64 {
		static encode(src: string | Uint8Array): string {
			throw new Error('Not implemented')
		}
		static decode(base64: string): Uint8Array {
			throw new Error('Not implemented')
		}
	}
}
