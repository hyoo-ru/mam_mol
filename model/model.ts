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

		resource_url() {
			return this.uri()
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

			const resource = $mol_http.resource( this.resource_url() )
			resource.method_put = $mol_const( this.method_put() )

			return this.json_update( resource.json( next , force ) )
		}

		json_update( patch : Partial< Raw > ) {
			const uri = this.uri()
			const cache =  $mol_model.cache< Raw >()

			return cache[ uri ] = $mol_merge_dict( cache[ uri ] || {} as Raw , patch )
		}

	}

	export function $mol_model_prop< Value , Json >(
		field : string ,
		make : ( json : Json )=> Value ,
	) {
		return < Raw , Host extends $mol_model< Raw > >(
			host : Host ,
			prop : string ,
			descr : TypedPropertyDescriptor< ( next?: Value )=> Value >
		)=> {
			if( field ) field = prop

			const value = descr.value

			descr.value = function( next? : Value ) {
				const val = this.json( next === undefined ? undefined : { ... this.json() , [ field ] : next } )[ field ]
				if( val === undefined ) return value()
				if( make ) return make( val )
				return val
			}
		}
	}

}
