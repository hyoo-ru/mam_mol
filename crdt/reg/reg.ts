namespace $ {
	
	/** JSON representation of Register */
	export type $mol_crdt_reg_data< Val extends string | number | boolean > = readonly[ Val, number ]
	
	/** Conflict Free Mergeable Register */
	export class $mol_crdt_reg< Val extends string | number > extends $mol_crdt_base {
		
		constructor(
			actor: number,
			protected value: Val,
			protected stamp: number,
		) {
			super( actor )
		}
		
		get version() {
			return this.stamp
		}
		
		toJSON() {
			return [ this.value, this.stamp ] as $mol_crdt_reg_data< Val >
		}
		
		put( val: Val ) {
			this.value = val
			this.stamp = this.version_increase( this.stamp )
		}
		
		merge(
			[ val, stamp ]: $mol_crdt_reg_data< Val >,
		) {
			
			if( stamp <= this.stamp ) return this
			
			this.value = val
			this.stamp = stamp
			
			return this
		}
		
		fork( actor = this.actor ) {
			return new $mol_crdt_reg( actor, ... this.toJSON() )
		}
		
	}
	
}
