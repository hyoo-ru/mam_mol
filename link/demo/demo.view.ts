namespace $.$$ {

	export class $mol_link_demo extends $.$mol_link_demo {
		
		@ $mol_mem
		object_uri() {
			const blob = new Blob( ['hello;world\nhello1;world2'] , { type: 'text/csv' } )
			return $mol_dom_context.URL.createObjectURL( blob )
		}

	}

}
