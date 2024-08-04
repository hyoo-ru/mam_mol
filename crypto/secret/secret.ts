namespace $ {
	
	//@ts-ignore
	const curves = nobleCurves

	//@ts-ignore
	const ciphers = nobleCiphers
	
	/** Symmetric cipher with shortest payload */
	export class $mol_crypto_secret extends Object {
		
		/** Key size in bytes. */
		static size = 16
		
		stream: any
		constructor(
			readonly key: Uint8Array,
			readonly nonce: Uint8Array,
		) {
			super()
			this.stream = ciphers.cbc( key, nonce )
		}
		
		static async generate() {
			const key = $mol_crypto_native.getRandomValues( new Uint8Array( 16 ) )
			return new this( key, key )
		}
		
		static async from( serial: Uint8Array ) {
			const key = serial
			return new this( serial, serial )
		}
		
		/** 16 bytes */
		async serial() {
			return this.key!
		}

		/** 16n bytes */
		async encrypt( open: BufferSource, salt: BufferSource ) {
			return this.stream.encrypt( open )
		}

		async decrypt( closed: BufferSource, salt : BufferSource ) {
			return this.stream.decrypt( closed )
		}
		
		static async pass( pass: string, salt: Uint8Array ) {
			
			return this.generate()

			// const pack = $mol_charset_encode( pass )
			// const hash = $mol_crypto_hash( pack ).slice( 0, $mol_crypto_secret.size )

			// return this.from( hash )
			
		}
		
		static async derive( private_serial: string, public_serial: string ) {

			const priv = new Uint8Array( $mol_base64_url_decode( private_serial.slice( 86, 129 ) ) )
			const pub = new Uint8Array( $mol_base64_url_decode( public_serial.slice( 0, 43 ) ) )

			const priv2 = curves.ed25519_edwardsToMontgomeryPriv(priv)
			const pub2 = curves.ed25519_edwardsToMontgomeryPub(pub)

			const shared = curves.x25519.getSharedSecret( priv2, pub2 ).slice( 0, 16 )
			return this.from( shared )

		}
		
	}

}
