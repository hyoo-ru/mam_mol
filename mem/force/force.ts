namespace $ {

	export class $mol_mem_force extends Object {
		constructor(){ super() }
		$mol_mem_force = true
		static $mol_mem_force = true
		static toString() { return this.name }
	}

	export class $mol_mem_force_cache extends $mol_mem_force {}
	export class $mol_mem_force_update extends $mol_mem_force {}
	export class $mol_mem_force_fail extends $mol_mem_force_cache {}

}
