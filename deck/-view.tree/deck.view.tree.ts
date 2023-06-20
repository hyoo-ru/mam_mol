namespace $ {
	export class $mol_deck extends $mol_list {
		
		/**
		 * ```tree
		 * items /$mol_view
		 * ```
		 */
		items() {
			return [
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * rows /$mol_view
		 * 	<= Switch
		 * 	<= Content
		 * ```
		 */
		rows() {
			return [
				this.Switch(),
				this.Content()
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * current? \0
		 * ```
		 */
		@ $mol_mem
		current(next?: any) {
			if ( next !== undefined ) return next as never
			return "0"
		}
		
		/**
		 * ```tree
		 * switch_options *
		 * ```
		 */
		switch_options() {
			return {
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * Switch $mol_switch
		 * 	value? <=> current?
		 * 	options <= switch_options
		 * ```
		 */
		@ $mol_mem
		Switch() {
			const obj = new this.$.$mol_switch()
			
			obj.value = (next?: any) => this.current(next)
			obj.options = () => this.switch_options()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Content $mol_view
		 * ```
		 */
		@ $mol_mem
		Content() {
			const obj = new this.$.$mol_view()
			
			return obj
		}
	}
	
}

