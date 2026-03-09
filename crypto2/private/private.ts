namespace $ {
	/** Compose private key for signing and encryption, based on Curve25519. */
	export class $mol_crypto2_private extends $mol_crypto2_public {
		
		/** Generates new private key. */
		static async generate() {
			
			const [ signer, cipher ] = await Promise.all([
				$mol_crypto2_signer.generate(),
				$mol_crypto2_cipher.generate(),
			])
			
			const key = $mol_crypto2_private.from( $mol_crypto2_public.size_bin + $mol_crypto2_private.size_bin )
			
			key.asArray().set( signer.asArray(), 0 )
			key.asArray().set( cipher.asArray(), 32 )
			
			key.asArrayPrivate().set( signer.asArrayPrivate(), 0 )
			key.asArrayPrivate().set( cipher.asArrayPrivate(), 32 )
			
			return key
		}
		
		/** Return Signer part. */
		@ $mol_memo.method
		signer() {
			const signer = $mol_crypto2_signer.from( $mol_crypto2_auditor.size_bin + $mol_crypto2_signer.size_bin )
			signer.asArray().set( this.asArray().subarray( 0, 32 ) )
			signer.asArrayPrivate().set( this.asArrayPrivate().subarray( 0, 32 ) )
			return signer
		}
		
		/** Return Cipher part. */
		@ $mol_memo.method
		cipher() {
			const cipher = $mol_crypto2_cipher.from( $mol_crypto2_socket.size_bin + $mol_crypto2_cipher.size_bin )
			cipher.asArray().set( this.asArray().subarray( 32, 64 ) )
			cipher.asArrayPrivate().set( this.asArrayPrivate().subarray( 32, 64 ) )
			return cipher
		}
		
		/** Return Public part. */
		@ $mol_memo.method
		public() {
			return $mol_crypto2_public.from( this.asArray() )
		}
		
		/** Array view of private part. */
		asArrayPrivate() {
			return new Uint8Array( this.buffer, this.byteOffset + 64, 64 )
		}
		
		/** String representation of private part. */
		@ $mol_memo.method
		toStringPrivate() {
			return this.signer().toStringPrivate() + this.cipher().toStringPrivate()
		}
		
	}
}
