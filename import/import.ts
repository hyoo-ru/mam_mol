namespace $ {

	export class $mol_import extends $mol_object2 {
		
		@ $mol_mem_key
		static script( uri : string , next? : any , force? : $mol_mem_force ) : any {
			const doc = $mol_dom_context.document

			const found = doc.querySelector( `script[src="${ uri }"]` )
			if( found ) return $mol_dom_context

			return $mol_fail_hidden( new Promise( ( done , fail ) => {

				const script = doc.createElement( 'script' )
				script.src = uri
				
				script.onload = ()=> done( $mol_dom_context )
				script.onerror = ()=> fail( new Error( `Can not import ${ uri }` ) )
				
				doc.head.appendChild( script )

			} ) )
			

		}

	}

}
