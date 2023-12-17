namespace $ {
	export class $mol_link extends $mol_view {
		
		/**
		 * ```tree
		 * uri \
		 * ```
		 */
		uri() {
			return ""
		}
		
		/**
		 * ```tree
		 * dom_name \a
		 * ```
		 */
		dom_name() {
			return "a"
		}
		
		/**
		 * ```tree
		 * uri_off \
		 * ```
		 */
		uri_off() {
			return ""
		}
		
		/**
		 * ```tree
		 * uri_native null
		 * ```
		 */
		uri_native() {
			return null as any
		}
		
		/**
		 * ```tree
		 * external false
		 * ```
		 */
		external() {
			return false
		}
		
		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	href <= uri_toggle
		 * 	title <= hint_safe
		 * 	target <= target
		 * 	download <= file_name
		 * 	mol_link_current <= current
		 * 	rel <= relation
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				href: this.uri_toggle(),
				title: this.hint_safe(),
				target: this.target(),
				download: this.file_name(),
				mol_link_current: this.current(),
				rel: this.relation()
			} as Record< string, any >
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
		 * arg *
		 * ```
		 */
		arg() {
			return {
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * event *
		 * 	^
		 * 	click?event <=> click?event
		 * ```
		 */
		event() {
			return {
				...super.event(),
				click: (event?: any) => this.click(event)
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * uri_toggle \
		 * ```
		 */
		uri_toggle() {
			return ""
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
		 * hint_safe <= hint
		 * ```
		 */
		hint_safe() {
			return this.hint()
		}
		
		/**
		 * ```tree
		 * target \_self
		 * ```
		 */
		target() {
			return "_self"
		}
		
		/**
		 * ```tree
		 * file_name \
		 * ```
		 */
		file_name() {
			return ""
		}
		
		/**
		 * ```tree
		 * current false
		 * ```
		 */
		current() {
			return false
		}
		
		/**
		 * ```tree
		 * relation \
		 * ```
		 */
		relation() {
			return ""
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
		 * click?event <=> event_click?event
		 * ```
		 */
		click(event?: any) {
			return this.event_click(event)
		}
	}
	
}

