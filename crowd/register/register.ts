namespace $ {
	
	export type $mol_crowd_register_value = string | number | boolean | null
	
	/** JSON representation of Register */
	export type $mol_crowd_register_data = readonly[ $mol_crowd_register_value, number ]
	
	/** Conflict Free Mergeable Register */
	export class $mol_crowd_register extends $mol_crowd_base {
		
		constructor(
			actor: number,
			protected value: $mol_crowd_register_value | null = null,
			protected stamp = 0,
		) {
			super( actor )
		}
		
		get version() {
			return this.stamp
		}
		
		toJSON() {
			return [ this.value, this.stamp ] as $mol_crowd_register_data
		}
		
		set( val: $mol_crowd_register_value ) {
			this.value = val
			this.stamp = this.version_increase( this.stamp )
			return this
		}
		
		merge(
			[ val, stamp ]: $mol_crowd_register_data,
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
