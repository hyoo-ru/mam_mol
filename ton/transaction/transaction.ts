namespace $ {

	export class $mol_ton_transaction extends $mol_object2 {

		ton(): $mol_ton {
			throw new Error('Not defined')
		}

		obj(): any {
			throw new Error('Not defined')
		}

		incoming() {
			return !!this.obj().in_msg.source
		}

		address_from() {
			return this.incoming() ? this.obj().in_msg.source : this.obj().out_msgs[0].source
		}

		address_to() {
			return this.incoming() ? this.obj().in_msg.destination : this.obj().out_msgs[0].destination
		}

		@ $mol_mem
		amount_nano() {
			let amount = $mol_ton.amount(this.obj().in_msg.value)

			for (const outMsg of this.obj().out_msgs) {
                amount = amount.sub( $mol_ton.amount(outMsg.value) )
            }

			return amount
		}

		amount() {
			return $mol_ton.fromNano( this.amount_nano() )
		}

		payload() {
			return this.incoming() ? this.obj().in_msg : this.obj().out_msgs[0]
		}

		@ $mol_mem
		comment() {
			const payload = this.payload()
			if (!payload.msg_data || payload.msg_data['@type'] !== 'msg.dataText') return ''
			return $mol_base64_decode( payload.msg_data.text );
		}

		fee() {
			return this.obj().fee.toString()
		}

		fee_storage() {
			return this.obj().storage_fee.toString()
		}

		fee_other() {
			return this.obj().other_fee.toString()
		}

		@ $mol_mem
		date() {
			return new $mol_time_moment( this.obj().utime * 1000 )
		}

	}

}
