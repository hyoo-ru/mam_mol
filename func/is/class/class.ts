namespace $ {

	export function $mol_func_is_class<
		Func extends Function
	>(
		func: Func
	): func is Func & ( new( ...args: any[] )=> any ) {
		return Object.getOwnPropertyDescriptor( func, 'prototype' )?.writable === false
	}

}
