namespace $ {

	export function $mol_func_is_class( func: Function ) {
		return Object.getOwnPropertyDescriptor( func, 'prototype' )?.writable === false
	}

}
