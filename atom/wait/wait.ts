namespace $ {
	
	console.warn( '$mol_atom_wait is deprecated. Use $mol_fiber_sync instead.' )

	export class $mol_atom_wait extends Promise< void > {
		constructor( public message = 'Wait...' ) {
			super( ()=> {} )
		}
	}

	$mol_atom_wait.prototype.constructor = Promise
	
}
