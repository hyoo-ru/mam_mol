namespace $.$$ {
	export class $mol_link_lazy_demo extends $.$mol_link_lazy_demo {

		override uri_generated() {
			const blob = new Blob( ['hello;world\nhello1;world2'] , { type: 'text/csv' } )
			return $mol_dom_context.URL.createObjectURL( blob )
		}
	}
}
