namespace $.$$ {

	export class $mol_passkey_button_demo extends $.$mol_passkey_button_demo {

		@ $mol_mem
		info() {
			const key = this.key()
			return key ? `${ key.length } B: ${ $mol_base64_encode( key ) }` : ''
		}

	}

}