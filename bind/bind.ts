namespace $ {

	export function $mol_bind<
		Slave extends object ,
		Master extends object ,
		Slave_keys extends keyof Slave ,
		Master_keys extends keyof Master ,
	>(
		slave : Slave , 
		mapping : { [ key in Slave_keys ] : Master_keys } ,
		master : Master ,
	) {
		for( let slave_field in mapping ) {
		
			const master_field = mapping[ slave_field ]
			const descr = Object.getOwnPropertyDescriptor( slave , slave_field )

			Object.defineProperty( slave , slave_field , {
				enumerable : descr ? descr.enumerable : true ,
				get : ()=> master[ master_field ] ,
				set : next => { master[ master_field ] = next } ,
			} )

		}

		return slave
	}

}
