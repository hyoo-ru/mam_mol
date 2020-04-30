namespace $ {

	export class $mol_import extends $mol_object2 {
		
		@ $mol_mem_key
		static script( uri : string ) : any {
			
			return $mol_fiber_sync( ()=> {

				const doc = $mol_dom_context.document
				
				const script = doc.createElement( 'script' )
				script.src = uri
				doc.head.appendChild( script )
				
				return new Promise< typeof $mol_dom_context >( ( done , fail ) => {
					script.onload = ()=> done( $mol_dom_context )
					script.onerror = ()=> fail( new Error( `Can not import ${ uri }` ) )
				} )

			} )()

		}

	}

}
