namespace $ {
	
	export class $mol_crypto2_public extends $mol_crypto2_key {
		
		static size_str = 86
		static size_bin = 64
		
		@ $mol_memo.method
		auditor() {
			return $mol_crypto2_auditor.from( this.asArray().subarray( 0, 32 ) )
		}
		
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
