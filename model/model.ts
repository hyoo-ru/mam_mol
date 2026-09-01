namespace $ {

	export class $mol_model< Raw extends Object > extends $mol_object {

		@( $mol_mem_key as any )
		static item<
			Instance extends $mol_model<{}>,
		>(
			this : { new() : Instance },
			uri : string,
		) : Instance {
			$mol_wire_solid()
			const instance = new this
			instance.uri = ()=> uri
			return instance
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
		json( next? : null | Partial< Raw > ): Raw {
			
			const prev = this.json_update()
			if( next ) return this.json_update({ ... prev, ... next })
			if( next === undefined && prev !== undefined ) return prev
			
			let json = $mol_fetch.json( this.resource_url() , {
				method : next ? this.method_put() : 'GET' ,
				body : next && JSON.stringify( next ) ,
				headers : { 
					'content-type' : 'application/json',
				},
			} ) as Raw
			
			return this.json_update( json )

		}

		@ $mol_mem
		json_update( patch? : Partial< Raw > ): Raw {
			
			if( patch ) this.json_update()
			else $mol_wire_solid()
			
			return patch as any
		}

	}

	// export function $mol_model_prop< Value , Json >(
	// 	field : keyof Json ,
	// 	make : ( json : Json )=> Value ,
	// ) {
	// 	return < Raw extends Object , Host extends $mol_model< Raw > >(
	// 		host : Host ,
	// 		prop : keyof Json ,
	// 		descr : TypedPropertyDescriptor< ( next?: Value )=> Value >
	// 	)=> {
	// 		if( field ) field = prop

	// 		const value = descr.value!

	// 		descr.value = function( this : Host , next? : Value ) {
	// 			const val = this.json( next === undefined ? undefined : { ... this.json() , [ field ] : next } )[ field ]
	// 			if( val === undefined ) return value.call( this )
	// 			if( make ) return make( val )
	// 			return val
	// 		}
	// 	}
	// }

}
