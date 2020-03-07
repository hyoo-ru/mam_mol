namespace $ {
	
	export class $mol_file_web extends $mol_file {

		static relative( path : string ) : $mol_file {
			return this.absolute( new URL( path , this.base ).toString() )
		}

		static base = $mol_dom_context.document
			? new URL( '.' , $mol_dom_context.document.currentScript!['src'] ).toString()
			: ''
		
		@ $mol_mem
		content( next? : string , force? : $mol_mem_force ) {
			return $mol_fetch.text( this.path() )
		}
	}

	$.$mol_file = $mol_file_web
}
