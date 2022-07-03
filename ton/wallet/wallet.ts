namespace $ {

	export class $mol_ton_wallet extends $mol_object2 {

		static Wallet(type = 'v3R2') {
			return $mol_ton.lib().Wallets.all[type]
		}

		@ $mol_action
		static words_create() {
			return $mol_wire_sync($mol_ton.lib().mnemonic).generateMnemonic() as string[]
		}

		@ $mol_action
		static words_to_pair(words: string[]) {
			const { secretKey } = $mol_wire_sync($mol_ton.lib().mnemonic).mnemonicToKeyPair(words)
			return $mol_ton.lib().utils.nacl.sign.keyPair.fromSeed(secretKey.slice(0, 32))
		}

		ton(): $mol_ton {
			throw new Error('Not defined')
		}

		keys(): { publicKey: Uint8Array, secretKey: Uint8Array } {
			throw new Error('Not defined')
		}

		@ $mol_mem
		obj(): ReturnType<typeof $mol_ton_wallet.Wallet> {
			const Wallet = $mol_ton_wallet.Wallet()

			let keys: ReturnType<$mol_ton_wallet['keys']> | null = null
			try { keys = this.keys() } catch(error) {}

			return new Wallet(this.ton().provider(), {
				publicKey: keys !== null ? keys.publicKey : undefined,
				address: keys === null ? this.address() : undefined,
				wc: 0,
			})
		}

		@ $mol_mem
		address() {
			return $mol_wire_sync(this.obj()).getAddress()
		}

		@ $mol_mem
		info() {
			return $mol_wire_sync( this.ton().provider() ).getWalletInfo( this.address().toString(true, true, true, this.ton().is_testnet()) )
		}

		initialized() {
			return this.info().account_state === 'active'
		}

		balance() {
			return $mol_ton.fromNano( String(this.info().balance) )
		}

		@ $mol_action
		transfer(address: string, amount: string, payload: string) {
			const wallet = this.ton().wallet(address)

			let seqno = this.info().seqno
			if (!seqno) seqno = 0

			if (wallet.initialized() === false) {
				address = wallet.address().toString(true, true, false, this.ton().is_testnet())
			}

			return this.obj().methods.transfer({
				secretKey: this.keys().secretKey,
				toAddress: address,
				amount: $mol_ton.toNano(amount),
				seqno: seqno,
				payload: payload,
				sendMode: 3,
			})
		}

		send(address: string, amount: string, payload: string) {
			const query = this.transfer(address, amount, payload)

			const response = $mol_wire_sync(query).send()

			if (response["@type"] === "ok") {
				return true;
			} else {
				console.error(response)
				return false;
			}
		}

		@ $mol_action
		transactions(count = 20) {
			const list = $mol_wire_sync( this.ton().api() ).getTransactions(this.address(), count) as unknown[]
			return list.map( data => this.ton().transaction(data) )
		}
	}

}
