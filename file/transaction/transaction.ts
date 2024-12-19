namespace $ {

	export type $mol_file_transaction_mode = 'create' | 'exists_truncate' | 'exists_fail' | 'read_only'
		| 'write_only' | 'read_write' | 'append'

	export type $mol_file_transaction_buffer = ArrayBufferView

	export class $mol_file_transaction extends $mol_object {
		path() { return '' }

		modes() { return [] as readonly $mol_file_transaction_mode[] }

		write(options: {
			buffer: ArrayBufferView | string | readonly ArrayBufferView[],
			offset?: number | null,
			length?: number | null,
			position?: number | null,
		}) {
			return 0
		}

		read() {
			return new Uint8Array()
		}

		truncate(size: number) {}

		close() {}

		override destructor() {
			this.close()
		}

	}
}
