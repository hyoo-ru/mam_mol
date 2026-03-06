namespace $ {
	export class $mol_store_session_class extends $mol_store_native {
		override native() {
			return $mol_store_safe( () => this.$.$mol_dom_context.sessionStorage )
		}
	}

	export let $mol_store_session : $mol_store< Record< string , any > > = new $mol_store_session_class

}
