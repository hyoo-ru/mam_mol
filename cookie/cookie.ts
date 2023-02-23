namespace $ {

	export class $mol_cookie {

		all() : { [key: string]: string} {
			return Object.fromEntries( 
				$mol_dom_context.document.cookie.split(/; ?/g).map( s => ( s.match( /^(.*?)=(.*)$/ ) ?? [] ).slice(1) ) );
		}

		set( cookies: { [key: string]: string} ): string {
			return $mol_dom_context.document.cookie = Object.keys( cookies ).map( key => key + '=' + cookies[key] ).join('; ');
		}
		
	}

}
