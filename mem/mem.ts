namespace $ {

	export let $mol_mem = $mol_wire_mem(0)
	export let $mol_mem_key = $mol_wire_mem(1)
	export let $mol_mem_cached = $mol_wire_probe
	export let $mol_mem_persist = $mol_wire_solid

	/** @deprecated See docs on $mol_wire_mem **/
	export class $mol_mem_force extends Object {
		constructor(){ super() }
		$mol_mem_force = true
		static $mol_mem_force = true
		static toString() { return this.name }
	}
	
	/** @deprecated See docs on $mol_wire_mem **/
	export class $mol_mem_force_cache extends $mol_mem_force {}
	
	/** @deprecated See docs on $mol_wire_mem **/
	export class $mol_mem_force_update extends $mol_mem_force {}
	
	/** @deprecated See docs on $mol_wire_mem **/
	export class $mol_mem_force_fail extends $mol_mem_force_cache {}
	
}
