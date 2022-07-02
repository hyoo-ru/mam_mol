namespace $ {

	export class $mol_ton_wallet extends $mol_object2 {

		ton(): $mol_ton {
			throw new Error('Not defined')
		}

		Wallet() {
			return this.ton().api().wallet.all.v3R2;
		}

		@ $mol_mem
		words(next?: string) {
			return this.$.$mol_store_local.value(this + '.words()', next)
		}

		@ $mol_mem
		keys() {
			let words = this.words()

			if (!words) {
				words = this.words( $mol_wire_sync($mol_ton.lib().mnemonic).generateMnemonic() )
			}

			const { secretKey }= $mol_wire_sync($mol_ton.lib().mnemonic).mnemonicToKeyPair(words)
			return $mol_ton.lib().utils.nacl.sign.keyPair.fromSeed(secretKey.slice(0, 32))
		}

		@ $mol_mem
		obj(): InstanceType<ReturnType<$mol_ton_wallet['Wallet']>> {
			throw new Error('Not defined')
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
			return $mol_ton.amount( this.info().balance )
		}

		@ $mol_action
		transfer(address: string, amount: string, payload: string) {
			const wallet = this.ton().wallet({ address })

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
		transactions(key: { address: string, count?: number }) {
			const list = $mol_wire_sync( this.ton().api() ).getTransactions( key.address, key.count ?? 20 ) as unknown[]
			return list.map( data => this.ton().transaction(data) )
		}
	}

}
