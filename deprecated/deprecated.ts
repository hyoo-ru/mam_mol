namespace $ {
	
	export function $mol_deprecated< Host , Method extends Function >( message : string ) {
		return function(
			host : Host ,
			field : string ,
			descr : TypedPropertyDescriptor< Method >
		) {
			const value = descr.value
			descr.value = function $mol_deprecated_wrapper() {
				console.warn( `${ host.constructor }::${ field } is deprecated. ${ message }` )
				return value.apply( this , arguments )
			} as any
		}
	}
	
}
