namespace $ {
	export class $mol_plot_map_heat extends $mol_plot_group {
		
		/**
		 * ```tree
		 * series_z /number
		 * ```
		 */
		series_z() {
			return [
			] as readonly number[]
		}
		
		/**
		 * ```tree
		 * graphs <= level_graphs
		 * ```
		 */
		graphs() {
			return this.level_graphs()
		}
		
		/**
		 * ```tree
		 * Level!z $mol_plot_map_heat_level
		 * 	points <= level_points!z
		 * 	opacity <= level_opacity!z
		 * 	diameter <= level_diameter
		 * 	aspect <= level_aspect
		 * ```
		 */
		@ $mol_mem_key
		Level(z: any) {
			const obj = new this.$.$mol_plot_map_heat_level()
			
			obj.points = () => this.level_points(z)
			obj.opacity = () => this.level_opacity(z)
			obj.diameter = () => this.level_diameter()
			obj.aspect = () => this.level_aspect()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Sample $mol_plot_graph_sample color <= color
		 * ```
		 */
		@ $mol_mem
		Sample() {
			const obj = new this.$.$mol_plot_graph_sample()
			
			obj.color = () => this.color()
			
			return obj
		}
		
		/**
		 * ```tree
		 * level_graphs /
		 * ```
		 */
		level_graphs() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * level_points!z /
		 * ```
		 */
		level_points(z: any) {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * level_opacity!z \1
		 * ```
		 */
		level_opacity(z: any) {
			return "1"
		}
		
		/**
		 * ```tree
		 * level_diameter 10
		 * ```
		 */
		level_diameter() {
			return 10
		}
		
		/**
		 * ```tree
		 * level_aspect 1
		 * ```
		 */
		level_aspect() {
			return 1
		}
	}
	
	export class $mol_plot_map_heat_level extends $mol_plot_dot {
		
		/**
		 * ```tree
		 * style *
		 * 	^
		 * 	opacity <= opacity
		 * ```
		 */
		style() {
			return {
				...super.style(),
				opacity: this.opacity()
			}
		}
		
		/**
		 * ```tree
		 * opacity \1
		 * ```
		 */
		opacity() {
			return "1"
		}
	}
	
}

