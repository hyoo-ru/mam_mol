namespace $ {

	export let $mol_mem = $mol_wire_mem(0)
	export let $mol_mem_key = $mol_wire_mem(1)
	
	export function $mol_mem_persist() {
		throw new Error( 'Use $mol_wire_cache( this ).your_channel( your_keys ).solid()' )
	}

}
