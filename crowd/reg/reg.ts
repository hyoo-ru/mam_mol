namespace $ {
	
	/** Types that can be stored in the CROWD Register */
	export type $mol_crowd_reg_value = string | number | boolean | null
	
	/** JSON representation of CROWD Register */
	export type $mol_crowd_reg_data = readonly( readonly[ $mol_crowd_reg_value, number ] )[]
	
	/** CROWD Register */
	export class $mol_crowd_reg extends $mol_crowd_store< $mol_crowd_reg_data > {
		
		value = null as $mol_crowd_reg_value | null
		stamp = 0
		
		get version() {
			return this.stamp
		}
		
		toJSON( version_min = 0 ) : $mol_crowd_reg_data {
			return this.version > version_min ? [ [ this.value, this.stamp ] ] : []
		}
				
		put( val: $mol_crowd_reg_value ) {
			this.value = val
			this.stamp = this.stamper.genegate()
			return this
		}
		
		merge(
			data: $mol_crowd_reg_data,
		) {
			
			for( const [ val, stamp ] of data ) {
			
				if( stamp <= this.stamp ) continue
				
				this.value = val
				this.stamp = stamp
				
				this.stamper.feed( stamp )
			}
			
			return this
		}
		
	}
	
}
