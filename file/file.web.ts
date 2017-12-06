namespace $ {
	
	export class $mol_file extends $mol_object {
		
		@ $mol_mem_key
		static absolute( path : string ) {
			return $mol_file.make({
				path : $mol_const( path )
			})
		}
		
		static relative( path : string ) : $mol_file {
			return this.absolute( new URL( path , this.base ).toString() )
		}

		static base = new URL( '.' , document.currentScript['src'] ).toString()
		
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
		
		@ $mol_mem
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
			
			return ( this.constructor as typeof $mol_file ).absolute( res )
		}
		
		relate( base = ( this.constructor as typeof $mol_file ).relative( '.' ) ) {
			throw new Error( 'Not implemented yet' )
		}
		
	}
	
}
