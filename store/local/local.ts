namespace $ {

	export class $mol_store_local_class extends $mol_store_session_class {
		override storage(): ReturnType<typeof $mol_store_mock> {
			return this.$.$mol_dom_context.localStorage
		}
	}

	export let $mol_store_local : $mol_store< Record< string , any > > = new $mol_store_local_class

}
