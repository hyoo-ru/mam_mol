namespace $ {

	export class $mol_ton extends $mol_object2 {

		@ $mol_mem
		static lib() {
			return $mol_import.script('https://unpkg.com/tonweb@0.0.50/dist/tonweb.js').TonWeb as typeof import('tonweb').default
		}

		static amount(value: string) {
			return new (this.lib().utils.BN)(value)
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
			const Provider = $mol_ton.lib().HttpProvider
			return new Provider( this.is_testnet() ? this.testnet() : this.mainnet() , { apiKey: this.api_key() } )
		}

		@ $mol_mem
		api() {
			const Ton = $mol_ton.lib()
			return new Ton( this.provider() )
		}

		@ $mol_mem
		keys_serial() {
			const key = this + '.keys()'
			let serial = this.$.$mol_state_local.value( key ) as null | { publicKey: string, secretKey: string }
			if( serial ) return serial

			const pair = $mol_ton.lib().utils.nacl.sign.keyPair()
			serial = {
				publicKey: new TextDecoder().decode(pair.publicKey),
				secretKey: new TextDecoder().decode(pair.secretKey),
			}
			this.$.$mol_state_local.value( key, serial )
			
			return serial
		}

		@ $mol_mem
		keys() {
			const serial = this.keys_serial()
			return {
				publicKey: new TextEncoder().encode(serial.publicKey),
				secretKey: new TextEncoder().encode(serial.secretKey),
			}
		}


		@ $mol_mem_key
		wallet(id: { publicKey?: Uint8Array, address?: string }) {
			const obj = new $mol_ton_wallet
			obj.ton = $mol_const(this)

			const Wallet = obj.Wallet()
			const wallet = new Wallet(this.provider(), { address: id.address, publicKey: id.publicKey, wc: 0 });
			obj.obj = $mol_const(wallet)

			return obj
		}

		transaction_comment_decode(msg: { msg_data?: { '@type': 'msg.dataText' | string, text: string } }) {
			if (!msg.msg_data || msg.msg_data['@type'] !== 'msg.dataText') return ''
			return new TextDecoder().decode($mol_ton.lib().utils.base64ToBytes( msg.msg_data.text ));
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

			let amount = new ($mol_ton.lib().utils.BN)(obj.in_msg.value)
			for (const outMsg of obj.out_msgs) {
                amount = amount.sub(new ($mol_ton.lib().utils.BN)(outMsg.value))
            }

			return {
				address_from,
				address_to,
				comment,
				amount,
				fee: obj.fee.toString(),
				fee_storage: obj.storage_fee.toString(),
				fee_other: obj.other_fee.toString(),
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
