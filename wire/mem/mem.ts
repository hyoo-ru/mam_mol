namespace $ {
	
	export function $mol_wire_mem< Keys extends number >( keys: Keys ) {
		
		const wrap = $mol_wire_mem_func( keys )
	
		return <
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
			
			const descr2 = {
				... descr,
				value: wrap( orig )
			}
			
			Reflect.defineProperty( host, field, descr2 )
			
			return descr2

		}
		
	}
	
	export function $mol_wire_mem_func< Keys extends number >( keys: Keys ) {
		
		return <
			Result,
			Host,
			Args extends unknown[],
			Func extends ( this: Host, ... args: Args )=> Result
		>( func: Func )=> {
			
			const persist = $mol_wire_fiber.persist( func, keys )
			
			const wrapper = function( this: Host, ... args: Parameters< Func > ){
				
				let atom = persist( this, args.slice( 0, keys ) as Args )
				
				if( args.length <= keys || args[ keys ] === undefined ) return atom.sync()
				
				try {
					atom.sync()
				} catch( error: unknown ) {
					$mol_fail_log( error )
				}
				
				return atom.recall( ... args as any )

			}
			
			Object.defineProperty( wrapper , 'name' , { value : func.name + ' ' } )
			Object.assign( wrapper, { orig: func } )
			
			return wrapper as unknown as Func
		}
		
	}

}
