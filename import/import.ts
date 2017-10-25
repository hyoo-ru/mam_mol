namespace $ {

	export class $mol_import {
		
		@ $mol_mem_key
		static script( uri : string , next? : any , force? : $mol_atom_force  ) : any {
			const doc = $mol_dom_context.document

			const found = doc.querySelector( `script[src="${ uri }"]` )
			if( found ) return $mol_dom_context

			const script = doc.createElement( 'script' )
			script.src = uri
			script.onload = ()=> this.script( uri , $mol_dom_context , $mol_atom_force_cache )
			doc.head.appendChild( script )
			
			throw new $mol_atom_wait( `Import ${ uri }` )
		}

	}

}