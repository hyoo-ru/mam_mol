namespace $ {
	export class $mol_store_shared_class extends $mol_store< Record< string , any > > {
		@ $mol_mem_key
		override value< Value >( key : string , next? : Value ) {
			const session = this.$.$mol_store_session.value(key, next)
			return this.$.$mol_store_mem.value(key, next) ?? session
		}
	}

	export let $mol_store_mem_class_shared : $mol_store< Record< string , any > > = new $mol_store_shared_class()
}
