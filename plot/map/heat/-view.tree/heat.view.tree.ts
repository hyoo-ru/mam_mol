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
		 * Level* $mol_plot_map_heat_level
		 * 	hint <= level_hint*
		 * 	points <= level_points*
		 * 	opacity <= level_opacity*
		 * 	diameter <= level_diameter
		 * 	aspect <= level_aspect
		 * ```
		 */
		@ $mol_mem_key
		Level(id: any) {
			const obj = new this.$.$mol_plot_map_heat_level()
			
			obj.hint = () => this.level_hint(id)
			obj.points = () => this.level_points(id)
			obj.opacity = () => this.level_opacity(id)
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
		 * level_hint* \
		 * ```
		 */
		level_hint(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * level_points* /
		 * ```
		 */
		level_points(id: any) {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * level_opacity* \1
		 * ```
		 */
		level_opacity(id: any) {
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

