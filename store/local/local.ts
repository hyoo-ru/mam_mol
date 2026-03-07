namespace $ {

	export class $mol_store_local_class extends $mol_store_native {
		override native() {
			return $mol_store_safe( () => this.$.$mol_dom_context.localStorage )
		}

		override fallback() {
			return this._fallback = this._fallback
				?? this.$.$mol_store_mem.sub<string, $mol_store<Record<string, any>>>('$mol_store_local')
		}
	}

	export let $mol_store_local : $mol_store< Record< string , any > > = new $mol_store_local_class()

}
