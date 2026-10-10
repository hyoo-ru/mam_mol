namespace $.$$ {

	export class $mol_passkey_button extends $.$mol_passkey_button {

		override sub() {
			return [
				this.Unlock(),
				...( this.error() ? [ this.Fail(), this.Fresh() ] : [] ),
			]
		}

		@ $mol_mem
		stored_id( next?: string | null ) {
			return this.$.$mol_state_local.value( this.storage_key(), next ) as string | null
		}

		@ $mol_action
		unlock() {
			this.error( '' )
			$mol_wire_async( this ).derive( this.stored_id(), this.salt(), false )
		}

		@ $mol_action
		create() {
			this.error( '' )
			$mol_wire_async( this ).derive( this.stored_id(), this.salt(), true )
		}

		async derive( stored: string | null, salt: string, fresh: boolean ) {
			try {

				const bin = new Uint8Array( $mol_charset_encode( salt ) )

				if( fresh ) {
					const id = await this.$.$mol_passkey_secret.make()
					this.stored_id( $mol_base64_encode( id ) )
					this.key( ( await this.$.$mol_passkey_secret.get( bin, id ) ).key )
					return
				}

				const id: Uint8Array<ArrayBuffer> | undefined = stored ? $mol_base64_decode( stored ) : undefined
				const found = await this.$.$mol_passkey_secret.get( bin, id )

				this.stored_id( $mol_base64_encode( found.id ) )
				this.key( found.key )

			} catch( error: any ) {
				this.error( error.message )
			}
		}

	}

}