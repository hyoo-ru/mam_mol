namespace $ {
	export class $mol_plot_map_heat_demo extends $mol_demo_large {
		
		/**
		 * ```tree
		 * title @ \Dynamic Heat Map Graphs
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_plot_map_heat_demo_title' )
		}
		
		/**
		 * ```tree
		 * count_x 20
		 * ```
		 */
		count_x() {
			return 20
		}
		
		/**
		 * ```tree
		 * count_y 200
		 * ```
		 */
		count_y() {
			return 200
		}
		
		/**
		 * ```tree
		 * count_z 20
		 * ```
		 */
		count_z() {
			return 20
		}
		
		/**
		 * ```tree
		 * sub / <= Plot
		 * ```
		 */
		sub() {
			return [
				this.Plot()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_plot_pane
		 * 	\visualization
		 * 	\heatmap
		 * 	\graph
		 * 	\dashboard
		 * ```
		 */
		tags() {
			return [
				"$mol_plot_pane",
				"visualization",
				"heatmap",
				"graph",
				"dashboard"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * terrain_x /number
		 * ```
		 */
		terrain_x() {
			return [
			] as readonly number[]
		}
		
		/**
		 * ```tree
		 * terrain_y /number
		 * ```
		 */
		terrain_y() {
			return [
			] as readonly number[]
		}
		
		/**
		 * ```tree
		 * terrain_z /number
		 * ```
		 */
		terrain_z() {
			return [
			] as readonly number[]
		}
		
		/**
		 * ```tree
		 * Terrain $mol_plot_map_heat
		 * 	series_x <= terrain_x
		 * 	series_y <= terrain_y
		 * 	series_z <= terrain_z
		 * ```
		 */
		@ $mol_mem
		Terrain() {
			const obj = new this.$.$mol_plot_map_heat()
			
			obj.series_x = () => this.terrain_x()
			obj.series_y = () => this.terrain_y()
			obj.series_z = () => this.terrain_z()
			
			return obj
		}
		
		/**
		 * ```tree
		 * zoom?val
		 * ```
		 */
		zoom(val?: any) {
			return this.Plot().scale_y(val)
		}
		
		/**
		 * ```tree
		 * Plot $mol_plot_pane
		 * 	scale_y?val => zoom?val
		 * 	zoom?val <=> zoom?val
		 * 	graphs / <= Terrain
		 * ```
		 */
		@ $mol_mem
		Plot() {
			const obj = new this.$.$mol_plot_pane()
			
			obj.zoom = (val?: any) => this.zoom(val)
			obj.graphs = () => [
				this.Terrain()
			] as readonly any[]
			
			return obj
		}
	}
	
}

