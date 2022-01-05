namespace $ {
	
	export let $mol_wire_mem = < Keys extends number >( keys: Keys ) => <
		Host extends object ,
		Field extends keyof Host ,
		Prop extends Extract< Host[ Field ] , ( ... args: any[] )=> any >,
	>(
		proto : Host ,
		name : Field ,
		descr? : TypedPropertyDescriptor< Prop >
	)=> {

		if( !descr ) descr = Reflect.getOwnPropertyDescriptor( proto , name )
		const orig = descr!.value!
		
		const sup = Reflect.getPrototypeOf( proto )!	
		if( typeof sup[ name as any ] === 'function' ) {
			Object.defineProperty( orig , 'name' , { value : sup[ name as any ].name } )
		}
		
		function value( this: Host, ... args: any[] ) {
			
			let atom = $mol_wire_fiber.persist( this, orig, ... args.slice( 0, keys ) )
			
			let res = atom.sync()
			if( args[ keys ] === undefined ) return res
			
			return atom.update( ... args )
			
		}
		
		Object.defineProperty( value , 'name' , { value : orig.name + '@' } )
		
		Object.assign( value, { orig } )
		const descr2 = { ... descr, value }
		Reflect.defineProperty( proto, name, descr2 )
		
		return descr2

	}

}
