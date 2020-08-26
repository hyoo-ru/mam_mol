namespace $ {

	export class $mol_model< Raw extends Object > extends $mol_object {

		@ $mol_mem_key
		static item<
			Instance extends $mol_model<{}>,
		>(
			this : { new() : Instance },
			uri : string,
		) : Instance {
			const instance = new this
			instance.uri = ()=> uri
			return instance
		}

		@ $mol_mem
		static cache< Raw extends Object >() {
			return {}
		}

		uri() {
			return ''
		}

		resource_url() {
			return this.uri()
		}

		method_put() {
			return 'PUT'
		}

		@ $mol_mem
		json( next? : Partial< Raw > , force? : $mol_mem_force ) {
			
			let json : Raw | undefined
			let uri = this.uri()			
			const cache = $mol_model.cache< Raw >()

			if( !next && !force ) {
				json = cache[ uri ]
				if( json != undefined ) return json
			}

			cache[ uri ] = undefined

			json = $mol_fetch.json( this.resource_url() , {
				method : next ? this.method_put() : 'GET' ,
				body : next && JSON.stringify( next ) ,
				headers : {
					'content-type' : 'application/json',
				},
			} ) as Raw

			return this.json_update( json )

		}

		json_update( patch : Partial< Raw > ) : Raw {
			const uri = this.uri()
			const cache =  $mol_model.cache< Raw >()

			return cache[ uri ] = {
				... cache[ uri ] || {} as Raw,
				... patch,
			}

		}

	}

	export function $mol_model_prop< Value , Json >(
		field : string ,
		make : ( json : Json )=> Value ,
	) {
		return < Raw extends Object , Host extends $mol_model< Raw > >(
			host : Host ,
			prop : string ,
			descr : TypedPropertyDescriptor< ( next?: Value )=> Value >
		)=> {
			if( field ) field = prop

			const value = descr.value!

			descr.value = function( this : Host , next? : Value ) {
				const val = this.json( next === undefined ? undefined : { ... this.json() , [ field ] : next } )[ field ]
				if( val === undefined ) return value.call( this )
				if( make ) return make( val )
				return val
			}
		}
	}

}
