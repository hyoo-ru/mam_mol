namespace $ {
	
	export class $mol_file extends $mol_object {
		
		@ $mol_mem_key()
		static absolute( path : string ) {
			const next = new $mol_file()
			next.path = ()=> path
			return next
		}
		
		static relative( path : string ) : $mol_file {
			const uri = new URL( path , $mol_dom_context.document.location.href )
			return $mol_file.absolute( path )
		}
		
		path() {
			return '.'
		}
		
		parent() {
			return this.resolve( '..' )
		}
		
		name() {
			return this.path().replace( /^.*\//, '' )
		}
		
		ext() {
			var match = /((?:\.\w+)+)$/.exec( this.path() )
			return match && match[ 1 ].substring( 1 )
		}
		
		@ $mol_mem()
		content( next? : string , force? : $mol_atom_force ) {
			return $mol_http.resource( this.path() ).text( next )
		}
		
		resolve( path : string ) : $mol_file {
			let res = this.path() + '/' + path
			
			while( true ) {
				let prev = res
				res = res.replace( /\/[^\/.]+\/\.\.\// , '/' )
				if( prev === res ) break
			}
			
			return this.Class().absolute( res )
		}
		
		relate( base = this.Class().relative( '.' ) ) {
			throw new Error( 'Not implemented yet' )
		}
		
	}
	
}
