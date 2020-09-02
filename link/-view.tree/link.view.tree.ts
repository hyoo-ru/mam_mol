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
		 * 	href <= uri
		 * 	title <= hint
		 * 	target <= target
		 * 	download <= file_name
		 * 	mol_link_current <= current
		 * 	mol_theme <= theme
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
		 * 	click?event <=> click?event
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
		 * event_click?event null
		 * ```
		 */
		@ $mol_mem
		event_click(event?: any) {
			if ( event !== undefined ) return event
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
