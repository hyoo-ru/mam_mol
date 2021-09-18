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
		 * trigger_enabled true
		 * ```
		 */
		trigger_enabled() {
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
		 * 	minimal_width 40
		 * 	minimal_height 40
		 * 	enabled <= trigger_enabled
		 * 	checked?event <=> showed?event
		 * 	sub <= trigger_content
		 * 	hint <= hint
		 * ```
		 */
		@ $mol_mem
		Trigger() {
			const obj = new this.$.$mol_check()
			
			obj.minimal_width = () => 40
			obj.minimal_height = () => 40
			obj.enabled = () => this.trigger_enabled()
			obj.checked = (event?: any) => this.showed(event)
			obj.sub = () => this.trigger_content()
			obj.hint = () => this.hint()
			
			return obj
		}
	}
	
}

