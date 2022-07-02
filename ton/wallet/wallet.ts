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
			return $mol_wire_sync(this.obj()).getAddress().toString(true, true, true, this.ton().is_testnet())
		}

		info() {
			return $mol_wire_sync( this.ton().provider() ).getWalletInfo( this.address() ) as unknown
		}

	}

}
