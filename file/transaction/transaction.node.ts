namespace $ {
	enum file_modes {
		/** create if it doesn't already exist */
		create = $node.fs.constants.O_CREAT,
		/** truncate to zero size if it already exists */
		exists_truncate = $node.fs.constants.O_TRUNC,
		/** throw exception if it already exists */
		exists_fail = $node.fs.constants.O_EXCL,
		read_only = $node.fs.constants.O_RDONLY,
		write_only = $node.fs.constants.O_WRONLY,
		read_write = $node.fs.constants.O_RDWR,
		/** data will be appended to the end */
		append = $node.fs.constants.O_APPEND,
	}

	function mode_mask(modes: readonly $mol_file_transaction_mode[]) {
		return modes.reduce( ( res, mode )=> res | file_modes[ mode ], 0 )
	}

	export class $mol_file_transaction_node extends $mol_file_transaction {
		@ $mol_mem
		protected descr() {
			$mol_wire_solid()
			return $node.fs.openSync(this.path(), mode_mask(this.modes()) )
		}

		override write({ buffer, offset = 0, length = buffer.byteLength, position }: {
			buffer: ArrayBufferView,
			offset?: number | null,
			length?: number | null,
			position?: number | null,
		}) {
			return $node.fs.writeSync( this.descr(), buffer as NodeJS.ArrayBufferView, offset, length, position )
		}

		override truncate(size: number) {
			$node.fs.ftruncateSync(this.descr())
		}

		override read() {
			return $mol_file_node_buffer_normalize($node.fs.readFileSync(this.descr()) as Buffer< ArrayBuffer >)
		}

		override close() {
			$node.fs.closeSync(this.descr())
		}

	}

	$.$mol_file_transaction = $mol_file_transaction_node
}
