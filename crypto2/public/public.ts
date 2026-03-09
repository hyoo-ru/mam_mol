namespace $ {
	/** Compose public key for verifying and encryption, based on Curve25519. */
	export class $mol_crypto2_public extends $mol_crypto2_key {
		
		static size_str = 86
		static size_bin = 64
		
		/** Return Auditor part. */
		@ $mol_memo.method
		auditor() {
			return $mol_crypto2_auditor.from( this.asArray().subarray( 0, 32 ) )
		}
		
		/** Return Socket part. */
		@ $mol_memo.method
		socket() {
			return $mol_crypto2_socket.from( this.asArray().subarray( 32, 64 ) )
		}
		
		@ $mol_memo.method
		toString() {
			return this.auditor().toString() + this.socket().toString()
		}
		
	}
}
