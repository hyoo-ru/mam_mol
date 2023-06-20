namespace $ {
	export class $mol_nav_demo extends $mol_example {
		
		/**
		 * ```tree
		 * title \Number input control with various configuration
		 * ```
		 */
		title() {
			return "Number input control with various configuration"
		}
		
		/**
		 * ```tree
		 * plugins / <= Nav
		 * ```
		 */
		plugins() {
			return [
				this.Nav()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * sub / <= Demo_items
		 * ```
		 */
		sub() {
			return [
				this.Demo_items()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags / \navigation
		 * ```
		 */
		tags() {
			return [
				"navigation"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Widget/Plugin
		 * 	\Controler/Keyboard
		 * ```
		 */
		aspects() {
			return [
				"Widget/Plugin",
				"Controler/Keyboard"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Nav $mol_nav
		 * 	keys_x <= tab_list
		 * 	current_x? <=> tab_current?
		 * 	keys_y <= row_list
		 * 	current_y? <=> row_current?
		 * ```
		 */
		@ $mol_mem
		Nav() {
			const obj = new this.$.$mol_nav()
			
			obj.keys_x = () => this.tab_list()
			obj.current_x = (next?: any) => this.tab_current(next)
			obj.keys_y = () => this.row_list()
			obj.current_y = (next?: any) => this.row_current(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * tab_current? \
		 * ```
		 */
		@ $mol_mem
		tab_current(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * tab_list
		 * ```
		 */
		tab_list() {
			return this.Tab_list().keys()
		}
		
		/**
		 * ```tree
		 * Tab_list $mol_switch
		 * 	keys => tab_list
		 * 	value? <=> tab_current?
		 * 	options *
		 * 		first \First
		 * 		second \Second
		 * 		third \Third
		 * ```
		 */
		@ $mol_mem
		Tab_list() {
			const obj = new this.$.$mol_switch()
			
			obj.value = (next?: any) => this.tab_current(next)
			obj.options = () => ({
				first: "First",
				second: "Second",
				third: "Third"
			} as Record< string, any >)
			
			return obj
		}
		
		/**
		 * ```tree
		 * row_current? \
		 * ```
		 */
		@ $mol_mem
		row_current(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * row_list
		 * ```
		 */
		row_list() {
			return this.Row_list().keys()
		}
		
		/**
		 * ```tree
		 * Row_list $mol_switch
		 * 	keys => row_list
		 * 	value? <=> row_current?
		 * 	options *
		 * 		first \First
		 * 		second \Second
		 * 		third \Third
		 * ```
		 */
		@ $mol_mem
		Row_list() {
			const obj = new this.$.$mol_switch()
			
			obj.value = (next?: any) => this.row_current(next)
			obj.options = () => ({
				first: "First",
				second: "Second",
				third: "Third"
			} as Record< string, any >)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Demo_items $mol_card
		 * 	content /
		 * 		<= Tab_list
		 * 		<= Row_list
		 * 	status \Select option and use keys to switch
		 * ```
		 */
		@ $mol_mem
		Demo_items() {
			const obj = new this.$.$mol_card()
			
			obj.content = () => [
				this.Tab_list(),
				this.Row_list()
			] as readonly any[]
			obj.status = () => "Select option and use keys to switch"
			
			return obj
		}
	}
	
}

