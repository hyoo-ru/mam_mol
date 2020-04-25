namespace $ {
	
	export function $mol_deprecated( message : string ) {
		return <
			Method extends ( this : Host , ... args : readonly any[] )=> any ,
			Host extends {
				[key in Field] : Method
			},
			Field extends keyof Host ,
		>(
			host : Host ,
			field : Field ,
			descr : TypedPropertyDescriptor< Method >
		)=> {

			const value = descr.value!
			let warned = false
			
			descr.value = function $mol_deprecated_wrapper( this : Host , ... args : Parameters< Method > ) : ReturnType< Method >  {

				if( !warned ) {
					console.warn( `${ host.constructor.name }::${ field } is deprecated. ${ message }` )
					warned = true
				}
				
				return value.call( this , ... args )
			
			} as any

		}
	}
	
}
