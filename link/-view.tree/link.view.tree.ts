namespace $ {
	export class $mol_link extends $mol_view {

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
		 * attr *
		 * 	^
		 * 	href <= uri \
		 * 	title <= hint \
		 * 	target <= target \_self
		 * 	download <= file_name \
		 * 	mol_link_current <= current false
		 * 	mol_theme <= theme null
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				href: this.uri(),
				title: this.hint(),
				target: this.target(),
				download: this.file_name(),
				mol_link_current: this.current(),
				mol_theme: this.theme()
			}
		}

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
		 * hint \
		 * ```
		 */
		hint() {
			return ""
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
		 * theme null
		 * ```
		 */
		theme() {
			return null as any
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

			}
		}

		/**
		 * ```tree
		 * event *
		 * 	^
		 * 	click?event <=> click?event <=> event_click?event null
		 * ```
		 */
		event() {
			return {
				...super.event(),
				click: (event?: any) => this.click(event)
			}
		}

		/**
		 * ```tree
		 * click?event <=> event_click?event null
		 * ```
		 */
		click(event?: any) {
			return this.event_click(event)
		}

		/**
		 * ```tree
		 * event_click?event null
		 * ```
		 */
		@ $mol_mem
		event_click(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}
	}

}
