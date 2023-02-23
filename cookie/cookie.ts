namespace $ {

	export class $mol_cookie {

		all() : { [key: string]: string} {
			return Object.fromEntries(
					$mol_dom_context.document.cookie.split(/; ?/g).map(
						s => [ 
								s.substring( 0,  s.indexOf('=') ),
								s.substring( 1 + s.indexOf('=') ) 
							]
					)
				);
		}

		set( cookies: { [key: string]: string} ): string {
			return $mol_dom_context.document.cookie = Object.keys( cookies ).map( key => key + '=' + cookies[key] ).join( '; ' );
		}
		
	}

}
