namespace $ {
	export class $mol_store_temp_class extends $mol_store_session_class {
		@ $mol_mem_key
		override value< Value >( key : string , next? : Value , force? : 'local' ) {
			const session = super.value(key, next, force)
			return this.$.$mol_store_mem.value(key, next) ?? session
		}
	}

	export let $mol_store_temp : $mol_store< Record< string , any > > = new $mol_store_temp_class
}
