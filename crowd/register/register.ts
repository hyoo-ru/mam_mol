namespace $ {
	
	/** JSON representation of Register */
	export type $mol_crowd_register_data< Val extends string | number | boolean > = readonly[ Val, number ]
	
	/** Conflict Free Mergeable Register */
	export class $mol_crowd_register< Val extends string | number > extends $mol_crowd_base {
		
		constructor(
			actor: number,
			protected value: Val,
			protected stamp = 0,
		) {
			super( actor )
		}
		
		get version() {
			return this.stamp
		}
		
		toJSON() {
			return [ this.value, this.stamp ] as $mol_crowd_register_data< Val >
		}
		
		put( val: Val ) {
			this.value = val
			this.stamp = this.version_increase( this.stamp )
			return this
		}
		
		merge(
			[ val, stamp ]: $mol_crowd_register_data< Val >,
		) {
			
			if( stamp <= this.stamp ) return this
			
			this.value = val
			this.stamp = stamp
			
			return this
		}
		
		fork( actor = this.actor ) {
			return new $mol_crowd_register( actor, ... this.toJSON() )
		}
		
	}
	
}
