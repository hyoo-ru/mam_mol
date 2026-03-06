namespace $ {
	export class $mol_store_shared_class extends $mol_store_native {
		override native() {
			return $mol_store_safe( () => this.$.$mol_dom_context.sessionStorage )
		}

		@ $mol_mem_key
		override value< Value >( key : string , next? : Value , force? : 'local' ) {
			const session = super.value(key, next, force)
			return this.$.$mol_store_mem.value(key, next) ?? session
		}
	}

	export let $mol_store_shared : $mol_store< Record< string , any > > = new $mol_store_shared_class
}
