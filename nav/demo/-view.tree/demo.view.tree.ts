namespace $ {
	export class $mol_nav_demo extends $mol_list {
		
		/**
		 * ```tree
		 * title @ \Number input control with various configuration
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_nav_demo_title' )
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
		 * rows /
		 * 	<= Hint
		 * 	<= Tab_list
		 * 	<= Row_list
		 * ```
		 */
		rows() {
			return [
				this.Hint(),
				this.Tab_list(),
				this.Row_list()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Nav $mol_nav
		 * 	keys_x <= tab_list
		 * 	current_x?val <=> tab_current?val
		 * 	keys_y <= row_list
		 * 	current_y?val <=> row_current?val
		 * ```
		 */
		@ $mol_mem
		Nav() {
			const obj = new this.$.$mol_nav()
			
			obj.keys_x = () => this.tab_list()
			obj.current_x = (val?: any) => this.tab_current(val)
			obj.keys_y = () => this.row_list()
			obj.current_y = (val?: any) => this.row_current(val)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Hint $mol_card title @ \Select option and use keys to switch
		 * ```
		 */
		@ $mol_mem
		Hint() {
			const obj = new this.$.$mol_card()
			
			obj.title = () => this.$.$mol_locale.text( '$mol_nav_demo_Hint_title' )
			
			return obj
		}
		
		/**
		 * ```tree
		 * tab_current?val \
		 * ```
		 */
		@ $mol_mem
		tab_current(val?: any) {
			if ( val !== undefined ) return val as never
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
		 * 	value?val <=> tab_current?val
		 * 	options *
		 * 		first \First
		 * 		second \Second
		 * 		third \Third
		 * ```
		 */
		@ $mol_mem
		Tab_list() {
			const obj = new this.$.$mol_switch()
			
			obj.value = (val?: any) => this.tab_current(val)
			obj.options = () => ({
				first: "First",
				second: "Second",
				third: "Third"
			})
			
			return obj
		}
		
		/**
		 * ```tree
		 * row_current?val \
		 * ```
		 */
		@ $mol_mem
		row_current(val?: any) {
			if ( val !== undefined ) return val as never
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
		 * 	value?val <=> row_current?val
		 * 	options *
		 * 		first \First
		 * 		second \Second
		 * 		third \Third
		 * ```
		 */
		@ $mol_mem
		Row_list() {
			const obj = new this.$.$mol_switch()
			
			obj.value = (val?: any) => this.row_current(val)
			obj.options = () => ({
				first: "First",
				second: "Second",
				third: "Third"
			})
			
			return obj
		}
	}
	
}

