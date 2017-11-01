namespace $ {

	export class $mol_model< Raw > extends $mol_object {

		@ $mol_mem_key
		static item< Raw , Instance extends $mol_model<Raw> >( this : { new() : Instance } , uri : string ) : Instance {
			const instance = new this
			instance.uri = ()=> uri
			return instance
		}

		@ $mol_mem
		static cache< Raw >() {
			return {} as { [ key : string ] : Raw }
		}

		uri() {
			return ''
		}

		method_put() {
			return 'Put'
		}

		@ $mol_mem
		json( next? : Raw , force? : $mol_atom_force ) {
			let json : Raw
			let uri = this.uri()			
			const cache = $mol_model.cache< Raw >()

			if( !next && !force ) {
				json = cache[ uri ]
				if( json != undefined ) return json
			}

			cache[ uri ] = undefined

			const resource = $mol_http.resource( uri )
			resource.method_put = $mol_const( this.method_put() )
			resource.headers = $mol_const({
				... next ? { 'Authorization' : `token ${ $mol_github_auth.token([ 'public_repo' ]) }` } : {}
			})

			return this.json_update( resource.json( next , force ) )
		}

		json_update( patch : Partial< Raw > ) {
			const uri = this.uri()
			const cache =  $mol_model.cache< Raw >()

			return cache[ uri ] = $mol_merge_dict( cache[ uri ] || {} as Raw , patch )
		}

	}

}
