namespace $ {

	export class $mol_ton extends $mol_object2 {

		@ $mol_mem
		static lib() {
			const TonWeb = $mol_import.script('https://unpkg.com/tonweb@0.0.50/dist/tonweb.js').TonWeb as typeof import('tonweb').default & { mnemonic: any }
			$mol_import.script('https://unpkg.com/tonweb-mnemonic@1.0.1/dist/web/index.js')
			return TonWeb
		}

		@ $mol_mem_key
		static amount(value: string) {
			return new (this.lib().utils.BN)(value)
		}

		@ $mol_mem_key
		static nanoTo(value: string) {
			return $mol_ton.lib().utils.toNano(value)
		}

		static nanoFrom(obj: ReturnType<typeof $mol_ton.amount>) {
			return $mol_ton.lib().utils.fromNano(obj)
		}

		api_key() {
			return 'c0e4df33e6b63b8641add66d09d7aab5fdaef6c87d8afa30fa43c77f9ee51586'
		}

		testnet() {
			return 'https://testnet.toncenter.com/api/v2/jsonRPC'
		}

		mainnet() {
			return 'https://toncenter.com/api/v2/jsonRPC'
		}

		@ $mol_mem
		is_testnet(next?: boolean) {
			return next ?? true
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
	
		@ $mol_mem_key
		wallet(id: { publicKey?: Uint8Array, address?: string }) {
			const obj = new $mol_ton_wallet
			obj.ton = $mol_const(this)

			const Wallet = obj.Wallet()
			const wallet = new Wallet(this.provider(), { address: id.address, publicKey: id.publicKey, wc: 0 });
			obj.obj = $mol_const(wallet)

			return obj
		}

		@ $mol_mem_key
		transaction(data: any) {
			const obj = new $mol_ton_transaction
			obj.ton = $mol_const(this)
			obj.obj = $mol_const(data)

			return obj
		}

	}

}
