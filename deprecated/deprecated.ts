namespace $ {
	
	export function $mol_deprecated( message : string ) {
		return <
			Method extends ( this : Host , ... args : readonly any[] )=> any ,
			Host extends {
				[key in Field] : Method
			} & {
				$ : $mol_ambient_context
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
					this.$.$mol_log3_warn({
						place: `${ host.constructor.name }::${ field }`,
						message: `Deprecated` ,
						hint: message ,
					})
					warned = true
				}
				
				return value.call( this , ... args )
			
			} as any

		}
	}
	
}
