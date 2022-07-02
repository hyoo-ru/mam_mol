namespace $ {

	export class $mol_ton_wallet extends $mol_object2 {

		ton(): $mol_ton {
			throw new Error('Not defined')
		}

		Wallet() {
			return this.ton().api().wallet.all.v3R2;
		}

		@ $mol_mem
		obj(): InstanceType<ReturnType<$mol_ton_wallet['Wallet']>> {
			throw new Error('Not defined')
		}

		@ $mol_mem
		address() {
			return $mol_wire_sync(this.obj()).getAddress()
		}

		info() {
			return $mol_wire_sync( this.ton().provider() ).getWalletInfo( this.address().toString(true, true, true, this.ton().is_testnet()) )
		}

		initialized() {
			return this.info().account_state === 'active'
		}

		balance() {
			return new $mol_ton_amount( this.info().balance )
		}

		@ $mol_action
		send(address: string, amount: typeof $mol_ton_amount, comment: string) {
			const wallet = this.ton().wallet({ address })

			if (wallet.initialized() === false) {
				address = wallet.address().toString(true, true, false, this.ton().is_testnet())
			}

			const info = wallet.info()
			let seqno = info.seqno
			if (!seqno) seqno = 0

			const query = this.obj().methods.transfer({
				secretKey: this.ton().keys().secretKey,
				toAddress: address,
				amount: amount,
				seqno: seqno,
				payload: comment,
				sendMode: 3,
			})

			const response = $mol_wire_sync(query).send()
			if (response["@type"] === "ok") {
				return true;
			} else {
				console.error(response)
				return false;
			}
		}
	}

}
