namespace $ {

	export class $mol_shared extends $mol_object2 {

		static cache< Value >( key : string , next? : Value ) {
			return this.$.$mol_fetch.json(
				'https://shared-cache.herokuapp.com/' + key ,
				next && {
					method : 'PUT' ,
					headers : {
						'content-type' : 'application/json' ,
					} ,
					body : JSON.stringify( next , null , '\t' ) ,
				} ,
			) as Value
		}

	}

}
