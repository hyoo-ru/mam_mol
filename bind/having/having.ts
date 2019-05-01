namespace $ {

	export function $mol_bind_having<
		Values extends string ,
		Mapping extends Record< string , Values > ,
		Keys extends keyof Mapping
	>( mapping : Mapping ) {

		return <
			Field extends string ,
			Host extends Record< Values , any > & Record< Field , Record< Keys , any > >
		>(
			proto: Host ,
			field: Field,
			descr?: any
		) => {
			if( !descr ) descr = Object.getOwnPropertyDescriptor( proto , field ) || {}

			const get = descr.get || function( this : Host ) {
				return this[ '_' + field ]
			} 
			
			const set = descr.set || function( this : Host , next : any ) {
				this[ '_' + field ] = next
			}

			return {
				get() {
					return $mol_bind( get.call( this ) , mapping as any , this )
				} ,
				set( next : Host[ Field ] ) {
					set.call( this , $mol_bind( next , mapping as any , this ) )
				} ,
			} as any
			
		}

	}

}
