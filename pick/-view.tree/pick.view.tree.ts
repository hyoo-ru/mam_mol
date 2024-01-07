namespace $ {
	export class $mol_pick extends $mol_pop {
		
		/**
		 * ```tree
		 * event *
		 * 	^
		 * 	keydown?event <=> keydown?event
		 * ```
		 */
		event() {
			return {
				...super.event(),
				keydown: (event?: any) => this.keydown(event)
			} as Record< string, any >
		}
		
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
		 * keydown?event null
		 * ```
		 */
		@ $mol_mem
		keydown(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
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
		 * clicks? null
		 * ```
		 */
		@ $mol_mem
		clicks(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * trigger_content /$mol_view_content <= title
		 * ```
		 */
		trigger_content() {
			return [
				this.title()
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
		 * 	checked? <=> showed?
		 * 	clicks? <=> clicks?
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
			obj.checked = (next?: any) => this.showed(next)
			obj.clicks = (next?: any) => this.clicks(next)
			obj.sub = () => this.trigger_content()
			obj.hint = () => this.hint()
			
			return obj
		}
	}
	
}

