namespace $ {
	
	/** Types that can be stored in the Crowd Register */
	export type $mol_crowd_reg_value = string | number | boolean | null
	
	/** JSON representation of Crowd Register */
	export type $mol_crowd_reg_data = readonly[ $mol_crowd_reg_value, number ]
	
	/** Conflict-free Crowd Register */
	export class $mol_crowd_reg extends $mol_crowd_base {
		
		protected value: $mol_crowd_reg_value | null
		protected stamp: number
		
		constructor(
			actor: number,
			data?: readonly[ $mol_crowd_reg_value, number ],
		) {
			super( actor )
			this.value = data ? data[0] : null
			this.stamp = data ? data[1] : 0
		}
		
		get version() {
			return this.stamp
		}
		
		toJSON() {
			return [ this.value, this.stamp ] as $mol_crowd_reg_data
		}
		
		set( val: $mol_crowd_reg_value ) {
			this.value = val
			this.stamp = this.version_gen()
			return this
		}
		
		merge(
			[ val, stamp ]: $mol_crowd_reg_data,
		) {
			
			if( stamp <= this.stamp ) return this
			
			this.value = val
			this.stamp = stamp
			
			this.version_feed( stamp )
			
			return this
		}
		
		fork( actor = this.actor ) {
			const fork = new $mol_crowd_reg( actor, this.toJSON() )
			fork.version_max = this.version_max
			return fork
		}
		
	}
	
}
