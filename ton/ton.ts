namespace $ {

	export class $mol_ton extends $mol_object2 {

		@ $mol_mem
		tonweb() {
			return $mol_import.script('https://unpkg.com/tonweb@0.0.50/dist/tonweb.js').TonWeb as typeof import('tonweb').default
		}

		api_key() { return '' }

		testnet() {
			return 'https://testnet.toncenter.com/api/v2/jsonRPC'
		}

		mainnet() {
			return 'https://toncenter.com/api/v2/jsonRPC'
		}

		is_testnet() {
			return true
		}

		@ $mol_mem
		provider() {
			const Provider = this.tonweb().HttpProvider
			return new Provider( this.is_testnet() ? this.testnet() : this.mainnet() , { apiKey: this.api_key() } )
		}

		@ $mol_mem
		api() {
			const Ton = this.tonweb()
			return new Ton( this.provider() )
		}

		@ $mol_mem
		keys() {
			const keys = this.tonweb().utils.nacl.sign.keyPair()
			return {
				private: keys.secretKey,
				public: keys.publicKey,
			}
		}

		@ $mol_mem
		wallet_create() {
			console.log(1)
			const keys = this.keys()
			console.log(2, keys)
			const Wallet = this.api().wallet.all.v3R2;
			console.log(3, Wallet)
			const wallet = new Wallet(this.provider(), { publicKey: keys.public, wc: 0 });
			console.log(4, wallet)
	/*>*/	const address = $mol_wire_sync(wallet).getAddress().toString(true, true, true, this.is_testnet())
			console.log(5, address)
			return { keys, address }
		}

		@ $mol_mem_key
		wallet_info(address: string) {
			return $mol_wire_sync( this.provider() ).getWalletInfo(address) as unknown
		}

		transaction_comment_decode(msg: { msg_data?: { '@type': 'msg.dataText' | string, text: string } }) {
			if (!msg.msg_data || msg.msg_data['@type'] !== 'msg.dataText') return ''
			return new TextDecoder().decode(this.tonweb().utils.base64ToBytes( msg.msg_data.text ));
		}

		transaction(obj: any) {
			// https://github.com/toncenter/ton-wallet/blob/521aa4642b2111905e23fb2424fe8e300c32827e/src/js/Controller.js#L306
			let address_from = ''
			let address_to = ''
			let comment = ''

			if (obj.in_msg.source) {
				address_from = obj.in_msg.source
				address_to = obj.in_msg.destination
				comment = this.transaction_comment_decode(obj.in_msg)
			} else if (obj.out_msgs.length) {
				address_from = obj.out_msgs[0].source;
                address_to = obj.out_msgs[0].destination;
                comment = this.transaction_comment_decode(obj.out_msgs[0]);
			}

			let amount = new (this.tonweb().utils.BN)(obj.in_msg.value)
			for (const outMsg of obj.out_msgs) {
                amount = amount.sub(new (this.tonweb().utils.BN)(outMsg.value))
            }

			return {
				address_from,
				address_to,
				comment,
				amount,
				fee: obj.fee.toString(),
				fee_storage: obj.storageFee.toString(),
				fee_other: obj.otherFee.toString(),
				date: new $mol_time_moment( obj.utime * 1000 ),
			}
		}

		@ $mol_action
		transaction_list(address: string, count = 20) {
			const list = $mol_wire_sync( this.api() ).getTransactions( address, count ) as unknown[]
			return list.map( obj => this.transaction(obj) )
		}

	}

}
