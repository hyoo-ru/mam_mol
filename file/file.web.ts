namespace $ {
	
	export class $mol_file extends $mol_object {
		
		@ $mol_mem_key()
		static absolute( path : string ) {
			return new $mol_file().setup(
				obj => {
					obj.path = ()=> path
				}
			)
		}
		
		static relative( path : string ) : $mol_file {
			if( /^\//.test( path ) ) {
				return $mol_file.root().resolve( path.substring(1) )
			}
			return $mol_file.base().resolve( path )
		}
		
		static root() {
			return $mol_file.absolute( '' )
		}
		
		static base() {
			const path = $mol_dom_context.document.location.pathname.replace( /\/[^\/]*$/ , '' )
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
			return $mol_http_resource.item( this.path() ).text( next )
		}
		
		resolve( path : string ) : $mol_file {
			let res = this.path() + '/' + path
			
			while( true ) {
				let prev = res
				res = res.replace( /\/[^\/]+\/\.\.\// , '/' )
				if( prev === res ) break
			}
			
			while( true ) {
				let prev = res
				res = res.replace( /\/\.\.\/[^\/]+\// , '/' )
				if( prev === res ) break
			}
			
			return this.Class().absolute( res )
		}
		
		relate( base = this.Class().relative( '.' ) ) {
			throw new Error( 'Not implemented yet' )
		}
		
	}
	
}
