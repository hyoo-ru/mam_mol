namespace $ {
	
	/** Types that can be stored in the Crowd Register */
	export type $mol_crowd_reg_value = string | number | boolean | null
	
	/** JSON representation of Crowd Register */
	export type $mol_crowd_reg_data = readonly( readonly[ $mol_crowd_reg_value, number ] )[]
	
	/** Conflict-free Crowd Register */
	export class $mol_crowd_reg extends $mol_crowd_base {
		
		value = null as $mol_crowd_reg_value | null
		stamp = 0
		
		constructor(
			actor: number,
			data?: $mol_crowd_reg_data,
		) {
			super( actor )
			if( data ) this.merge( data )
		}
		
		get version() {
			return this.stamp
		}
		
		toJSON( version_min = 0 ) : $mol_crowd_reg_data {
			return this.version > version_min ? [ [ this.value, this.stamp ] ] : []
		}
				
		set( val: $mol_crowd_reg_value ) {
			this.value = val
			this.stamp = this.version_gen()
			return this
		}
		
		merge(
			data: $mol_crowd_reg_data,
		) {
			
			for( const [ val, stamp ] of data ) {
			
				if( stamp <= this.stamp ) continue
				
				this.value = val
				this.stamp = stamp
				
				this.version_feed( stamp )
			}
			
			return this
		}
		
		fork( actor = this.actor ) {
			const fork = new $mol_crowd_reg( actor, this.toJSON() )
			fork.version_max = this.version_max
			return fork
		}
		
	}
	
}
