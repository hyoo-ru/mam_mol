namespace $ {

	export function $mol_bind<
		Slave extends object ,
		Master extends object
	>(
		slave : Slave , 
		mapping : { [ key in keyof Slave ] : keyof Master } ,
		master : Master ,
	) {
		for( let slave_field in mapping ) {
		
			const master_field = mapping[ slave_field ]
			const descr = Object.getOwnPropertyDescriptor( slave , slave_field )

			Object.defineProperty( slave , slave_field , {
				enumerable : descr.enumerable ,
				get : ()=> master[ master_field ] ,
				set : next => { master[ master_field ] = next } ,
			} )

		}

		return slave
	}

}
