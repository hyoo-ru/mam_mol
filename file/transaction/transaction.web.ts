namespace $ {
	export class $mol_file_transaction_web extends $mol_file_transaction {
		override write(options: {
			buffer: ArrayBufferView,
			offset?: number | null,
			length?: number | null,
			position?: number | null,
		}): number {
			throw new Error('Not implemented')
		}

		override truncate(size: number) {
			throw new Error('Not implemented')
		}

		override read(): Buffer< ArrayBuffer > {
			throw new Error('Not implemented')
		}

		override close() {
			throw new Error('Not implemented')
		}

	}

	$.$mol_file_transaction = $mol_file_transaction_web
}
