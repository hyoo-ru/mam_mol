namespace $ {
	export class $mol_pick extends $mol_pop {
		
		/**
		 * ```tree
		 * Anchor <= Trigger
		 * ```
		 */
		Anchor() {
			return this.Trigger()
		}
		
		/**
		 * ```tree
		 * enabled true
		 * ```
		 */
		enabled() {
			return true
		}
		
		/**
		 * ```tree
		 * trigger_content /$mol_view_content
		 * ```
		 */
		trigger_content() {
			return [
			] as readonly $mol_view_content[]
		}
		
		/**
		 * ```tree
		 * hint \
		 * ```
		 */
		hint() {
			return ""
		}
		
		/**
		 * ```tree
		 * Trigger $mol_check
		 * 	enabled <= enabled
		 * 	checked?event <=> showed?event
		 * 	sub <= trigger_content
		 * 	hint <= hint
		 * ```
		 */
		@ $mol_mem
		Trigger() {
			const obj = new this.$.$mol_check()
			
			obj.enabled = () => this.enabled()
			obj.checked = (event?: any) => this.showed(event)
			obj.sub = () => this.trigger_content()
			obj.hint = () => this.hint()
			
			return obj
		}
	}
	
}

