namespace $ {
	
	export function $mol_deprecated< Host extends { constructor : Function } , Method extends Function >( message : string ) {
		return function(
			host : Host ,
			field : string ,
			descr : TypedPropertyDescriptor< Method >
		) {
			const value = descr.value!
			descr.value = function $mol_deprecated_wrapper( this : Host ) {
				console.warn( `${ host.constructor.name }::${ field } is deprecated. ${ message }` )
				return value.apply( this , arguments )
			} as any
		}
	}
	
}
