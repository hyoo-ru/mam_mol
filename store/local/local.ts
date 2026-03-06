namespace $ {

	export class $mol_store_local_class extends $mol_store_native {
		@ $mol_mem
		override native() {
			return $mol_store_safe( () => this.$.$mol_dom_context.localStorage ) ?? super.native()
		}
	}

	export let $mol_store_local : $mol_store< Record< string , any > > = new $mol_store_local_class

}
