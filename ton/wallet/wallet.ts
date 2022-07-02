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
		transfer(address: string, amount: ReturnType<typeof $mol_ton.amount>, comment: string) {
			const wallet = this.ton().wallet({ address })

			const info = wallet.info()
			let seqno = info.seqno
			if (!seqno) seqno = 0

			if (wallet.initialized() === false) {
				address = wallet.address().toString(true, true, false, this.ton().is_testnet())
			}

			return this.obj().methods.transfer({
				secretKey: this.ton().keys().secretKey,
				toAddress: address,
				amount: amount,
				seqno: seqno,
				payload: comment,
				sendMode: 3,
			})
		}

		@ $mol_mem
		amount() {
				return $mol_ton.lib().utils.toNano('0.01')
		}

		send() {

				const address = 'EQCJ8v-iq5PmU06yDlsiTFQ6n9qtIWdUamAAoG3RBKuruZKJ'
				const amount = this.amount()
				const comment = 'hello'
			console.log(1)
			const query = this.transfer( address, amount, comment )

			console.log(2)
			const response = $mol_wire_sync(query).send()

			console.log(3)
			if (response["@type"] === "ok") {
				return true;
			} else {
				console.error(response)
				return false;
			}
		}
	}

}
