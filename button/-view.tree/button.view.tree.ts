namespace $ {
	export class $mol_button extends $mol_view {
		
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
		 * click?event null
		 * ```
		 */
		@ $mol_mem
		click(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * event_click?event null
		 * ```
		 */
		@ $mol_mem
		event_click(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * event *
		 * 	^
		 * 	click?event <=> event_activate?event
		 * 	dblclick?event <=> clicks?event
		 * 	keydown?event <=> event_key_press?event
		 * ```
		 */
		event() {
			return {
				...super.event(),
				click: (event?: any) => this.event_activate(event),
				dblclick: (event?: any) => this.clicks(event),
				keydown: (event?: any) => this.event_key_press(event)
			}
		}
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	disabled <= disabled
		 * 	role \button
		 * 	tabindex <= tab_index
		 * 	title <= hint
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				disabled: this.disabled(),
				role: "button",
				tabindex: this.tab_index(),
				title: this.hint()
			}
		}
		
		/**
		 * ```tree
		 * sub /$mol_view_content <= title
		 * ```
		 */
		sub() {
			return [
				this.title()
			] as readonly $mol_view_content[]
		}
		
		/**
		 * ```tree
		 * Speck $mol_speck value <= error
		 * ```
		 */
		@ $mol_mem
		Speck() {
			const obj = new this.$.$mol_speck()
			
			obj.value = () => this.error()
			
			return obj
		}
		
		/**
		 * ```tree
		 * event_activate?event null
		 * ```
		 */
		@ $mol_mem
		event_activate(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * clicks?event null
		 * ```
		 */
		@ $mol_mem
		clicks(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * event_key_press?event null
		 * ```
		 */
		@ $mol_mem
		event_key_press(event?: any) {
			if ( event !== undefined ) return event as never
			return null as any
		}
		
		/**
		 * ```tree
		 * disabled false
		 * ```
		 */
		disabled() {
			return false
		}
		
		/**
		 * ```tree
		 * tab_index 0
		 * ```
		 */
		tab_index() {
			return 0
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
		 * error \
		 * ```
		 */
		error() {
			return ""
		}
	}
	
}

