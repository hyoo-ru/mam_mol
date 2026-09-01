namespace $.$$ {
	
	export class $mol_plot_map_heat_demo extends $.$mol_plot_map_heat_demo {
		
		@ $mol_mem
		terrain_x() {
			const count_x = this.count_x()
			const count_y = this.count_y()
			return Array.from( { length: count_x * count_y }, (_,i)=> i % count_x )
		}

		@ $mol_mem
		terrain_y() {
			const count_x = this.count_x()
			const count_y = this.count_y()
			return Array.from( { length: count_x * count_y }, (_,i)=> Math.floor( i / count_x ) )
		}

		@ $mol_mem
		terrain_z() {
			
			const count_x = this.count_x()
			const count_y = this.count_y()
			const count_z = this.count_z()
			
			return Array.from(
				{ length: count_x * count_y },
				()=> Math.floor( Math.random() * count_z ) * 1000
			)
			
		}

	}
	
}
