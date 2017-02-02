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
			
			if( /^[\w-]+:/.test( path ) ) {
				return $mol_file.absolute( path )
			}
			
			if( /^\/[^\/]/.test( path ) ) {
				const prefix = $mol_dom_context.document.location.href.replace( /([^\/])\/[^\/]+.*/ , '$1' )
				return $mol_file.absolute( prefix + path )
			}
			
			const prefix = $mol_dom_context.document.location.href.replace( /[\?#].*$/ , '' ).replace( /\/[^\/]*$/ , '/' )
			return $mol_file.absolute( prefix + path )
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
			return this.Class().relative( path )
		}
		
		relate( base = this.Class().relative( '.' ) ) {
			throw new Error( 'Not implemented yet' )
		}
		
	}
	
}
