namespace $ {

	/** Dynamic sources import. */
	export class $mol_import extends $mol_object2 {
		
		@ $mol_mem_key
		static module( uri: string ): any {
			$mol_wire_solid()
			return $mol_wire_sync( this ).module_async( uri )
		}
		static module_async( uri: string ) {
			return import( uri )
		}

		@ $mol_mem_key
		static script( uri: string ): any {
			$mol_wire_solid()
			return $mol_wire_sync( this ).script_async( uri )
		}

		static script_async( uri: string ) {
			
			const doc = $mol_dom_context.document
			
			const script = doc.createElement( 'script' )
			script.src = uri
			doc.head.appendChild( script )
			
			return new Promise< any >( ( done , fail ) => {
				script.onload = ()=> done( $mol_dom_context )
				script.onerror = ()=> fail( new Error( `Can not import ${ uri }` ) )
			} )

		}

		@ $mol_mem_key
		static style( uri: string ): any {
			return $mol_wire_sync( this ).style_async( uri )
		}

		static style_async( uri: string ): any {
			
			const doc = $mol_dom_context.document
			
			const style = doc.createElement( 'link' )
			style.rel = 'stylesheet'
			style.href = uri
			doc.head.appendChild( style )
			
			return new Promise< CSSStyleSheet >( ( done , fail ) => {
				style.onload = ()=> done( style.sheet! )
				style.onerror = ()=> fail( new Error( `Can not import ${ uri }` ) )
			} )

		}

	}

}
