namespace $ {

	export type $mol_file_transaction_mode = 'create' | 'exists_truncate' | 'exists_fail' | 'read_only' | 'write_only' | 'read_write' | 'append'

	export type $mol_file_transaction_buffer = ArrayBufferView

	export class $mol_file_transaction extends $mol_object {
		
		path() { return '' }

		modes() { return [] as readonly $mol_file_transaction_mode[] }

		write(options: {
			buffer: ArrayBufferView | string | readonly ArrayBufferView[],
			offset?: number | null,
			length?: number | null,
			position?: number | null,
		}): number {
			throw new Error('Not implemented')
		}

		read(): Uint8Array< ArrayBuffer > {
			throw new Error('Not implemented')
		}

		truncate(size: number) {
			throw new Error('Not implemented')
		}

		flush() {
			throw new Error('Not implemented')
		}
		
		close() {
			throw new Error('Not implemented')
		}

		override destructor() {
			this.close()
		}
		
	}
}
