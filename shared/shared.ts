namespace $ {

	export class $mol_shared extends $mol_object2 {

		static cache< Value >( key : string , next? : Value ) {
			const resource = this.$.$mol_http.resource( 'https://shared-cache.herokuapp.com/' + key )
			resource.headers = ()=> ({ 'Content-Type' : 'application/json' })
			return resource.json( next )
		}

	}

}
