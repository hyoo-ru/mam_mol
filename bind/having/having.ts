namespace $ {

	export function $mol_bind_having<
		Values extends string ,
		Mapping extends Record< string , Values > ,
		Keys extends keyof Mapping
	>( mapping : Mapping ) {

		return <
			Field extends string ,
			Host extends Record< Mapping[ Keys ] , any > & Record< Field , Record< Keys , any > >
		>(
			proto: Host,
			field: Field,
			descr?: any
		) => {
			if( !descr ) descr = Object.getOwnPropertyDescriptor( proto , field ) || {}

			const get = descr.get || function() {
				return this[ '_' + field ]
			} 
			
			const set = descr.set || function( next : any ) {
				this[ '_' + field ] = next
			} 

			Object.defineProperty( proto , field , {
				get() {
					return $mol_bind( get.call( this ) , mapping , this )
				} ,
				set( next ) {
					set.call( this , $mol_bind( next , mapping , this ) )
				} ,
			} )
			
		}

	}

}
