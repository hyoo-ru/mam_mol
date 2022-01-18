namespace $ {
	
	export let $mol_wire_mem = < Keys extends number >( keys: Keys ) => <
		Host extends object ,
		Field extends keyof Host ,
		Prop extends Extract< Host[ Field ] , ( ... args: any[] )=> any >,
	>(
		host : Host ,
		field : Field ,
		descr? : TypedPropertyDescriptor< Prop >
	)=> {

		if( !descr ) descr = Reflect.getOwnPropertyDescriptor( host , field )
		const orig = descr?.value! ?? host[ field ]
		
		const sup = Reflect.getPrototypeOf( host )!
		if( typeof sup[ field as any ] === 'function' ) {
			Object.defineProperty( orig , 'name' , { value : sup[ field as any ].name } )
		}
		
		function value( this: Host, ... args: any[] ) {
			
			let atom = $mol_wire_fiber.persist( this, orig, ... args.slice( 0, keys ) )
			
			let res = atom.sync()
			if( args[ keys ] === undefined ) return res
			
			return atom.recall( ... args )
			
		}
		
		Object.defineProperty( value , 'name' , { value : orig.name + ' ' } )
		Object.assign( value, { orig } )
		
		const descr2 = { ... descr, value }
		Reflect.defineProperty( host, field, descr2 )
		
		return descr2

	}

}
