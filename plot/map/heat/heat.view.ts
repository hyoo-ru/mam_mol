namespace $.$$ {
	/**
	 * Heat map graph.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_plot_map_heat_demo
	 */
	export class $mol_plot_map_heat extends $.$mol_plot_map_heat {
		
		@ $mol_mem
		levels() {
			return [ ... new Set<number>( this.series_z() ) ].sort( ( a, b )=> a - b )
		}
		
		@ $mol_mem
		level_graphs() {
			return this.levels().map( (_,i)=> this.Level( i ) )
		}
		
		@ $mol_mem_key
		level_points( level: number ) {
			const value = this.levels()[ level ]
			const series_z = this.series_z()
			const res = [] as (readonly number[])[]
			for( const [ index, point ] of this.points().entries() ) {
				if( series_z[ index ] !== value ) continue
				res.push( point )
			}
			return res
		}
		
		@ $mol_mem_key
		level_opacity( level: number ) {
			return String( level / this.levels().length )
		}
		
		@ $mol_mem
		level_diameter() {
			return Math.min( ... this.scale().map( Math.abs ) )
		}
		
		@ $mol_mem
		level_aspect() {
			const scale = this.scale().map( Math.abs )
			return scale[1] / scale[0]
		}
		
		@ $mol_mem_key
		level_hint( index: number ) {
			return this.levels()[ index ].toLocaleString()
		}
		
	}
}
