namespace $ {

	export class $mol_github_auth extends $mol_object {

		static id() { return '07c88ba2782884016182' }

		static secret() { return '5874d66181f987a8bb2dc07bd431aad1c7a5cb38' }

		static code_uri() { return 'https://github.com/login/oauth/authorize' }
		
		static token_uri() { return 'http://cors.hyoo.ru/https://github.com/login/oauth/access_token' }

		@ $mol_mem
		static cache( next? : { scopes : string[] , token : string } ) {
			return $mol_state_local.value( `${ this }.cache()` , next ) || { scopes: [] , token : '' }
		}

		@ $mol_mem
		static scopes( next? : string[] ) {
			let cache = this.cache()
			let scopes = cache.scopes
			
			for( let scope of next || [] ) {
				if( scopes.indexOf( scope ) >= 0 ) continue
				scopes = scopes.concat( scope )
				this.cache({ scopes , token : '' })
			}
			
			return scopes
		}

		@ $mol_mem
		static code( next? : string , force? : $mol_atom_force ) : string {
			const win = $mol_dom_context.open( `${ this.code_uri() }?client_id=${ this.id() }&scope=${ this.scopes() }` , '$mol_github' )

			win.focus()
			
			const timer = setInterval( ()=> {
				try { win.location.href } catch( error ) { return }

				const search = win.location.search
				
				if( search !== undefined ) {
					const found = search.match( /\bcode=([^&]+)/ )
					if( !found ) return
					this.code( found[1] , $mol_atom_force_cache )
				} else {
					this.code( new Error( 'Can not get auth code' ) as any , $mol_atom_force_cache )
				}
				
				clearInterval( timer )

				win.close()
				$mol_dom_context.focus()
				
			} , 16 )

			throw new $mol_atom_wait( 'Request auth code...' )
		}

		@ $mol_mem
		static token_last( next? : string , force? : $mol_atom_force ) {
			const cache = this.cache()
			if( force ) this.cache({ ... cache , token : '' })
			if( !force && cache.token ) return cache.token
			
			const auth_uri = `${ this.token_uri() }?code=${ this.code( undefined , force ) }&client_id=${ this.id() }&client_secret=${ this.secret() }`
			
			const resource = $mol_http.resource( auth_uri )
			resource.headers = ()=> ({ 'Accept' : 'application/json' })
			
			const response = resource.json() as { access_token : string , error_description : string }
			if( response.error_description ) throw new Error( response.error_description )
			const token = response.access_token

			this.cache({ ... cache , token })

			return token
		}

		static token( scopes : string[] ) {
			this.scopes( scopes )
			return this.token_last()
		}

	}

}
