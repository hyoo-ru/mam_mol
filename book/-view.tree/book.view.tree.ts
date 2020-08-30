namespace $ {
	export class $mol_book extends $mol_view {

		/**
		 * ```tree
		 * sub <= pages_wrapped /$mol_view
		 * ```
		 */
		sub() {
			return this.pages_wrapped()
		}

		/**
		 * ```tree
		 * pages_wrapped /$mol_view
		 * ```
		 */
		pages_wrapped() {
			return [

			] as readonly $mol_view[]
		}

		/**
		 * ```tree
		 * minimal_width 0
		 * ```
		 */
		minimal_width() {
			return 0
		}

		/**
		 * ```tree
		 * pages /$mol_view
		 * ```
		 */
		pages() {
			return [

			] as readonly $mol_view[]
		}

		/**
		 * ```tree
		 * plugins /$mol_plugin
		 * 	<= Meter $mol_meter width => width
		 * 	<= Touch $mol_touch
		 * 		swipe_from_left?val <=> event_front_up?val null
		 * 		swipe_to_left?val <=> event_front_down?val null
		 * ```
		 */
		plugins() {
			return [
				this.Meter(),
				this.Touch()
			] as readonly $mol_plugin[]
		}

		/**
		 * ```tree
		 * Meter $mol_meter width => width
		 * ```
		 */
		@ $mol_mem
		Meter() {
			const obj = new this.$.$mol_meter()

			return obj
		}

		/**
		 * ```tree
		 * width
		 * ```
		 */
		width() {
			return this.Meter().width()
		}

		/**
		 * ```tree
		 * Touch $mol_touch
		 * 	swipe_from_left?val <=> event_front_up?val null
		 * 	swipe_to_left?val <=> event_front_down?val null
		 * ```
		 */
		@ $mol_mem
		Touch() {
			const obj = new this.$.$mol_touch()

			obj.swipe_from_left = (val?: any) => this.event_front_up(val)
			obj.swipe_to_left = (val?: any) => this.event_front_down(val)

			return obj
		}

		/**
		 * ```tree
		 * event_front_up?val null
		 * ```
		 */
		@ $mol_mem
		event_front_up(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * event_front_down?val null
		 * ```
		 */
		@ $mol_mem
		event_front_down(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * Page!index $mol_book_page
		 * 	Sub <= page!index null
		 * 	visible <= page_visible!index true
		 * ```
		 */
		@ $mol_mem_key
		Page(index: any) {
			const obj = new this.$.$mol_book_page()

			obj.Sub = () => this.page(index)
			obj.visible = () => this.page_visible(index)

			return obj
		}

		/**
		 * ```tree
		 * page!index null
		 * ```
		 */
		page(index: any) {
			return null as any
		}

		/**
		 * ```tree
		 * page_visible!index true
		 * ```
		 */
		page_visible(index: any) {
			return true
		}

		/**
		 * ```tree
		 * Placeholder $mol_book_placeholder title <= title
		 * ```
		 */
		@ $mol_mem
		Placeholder() {
			const obj = new this.$.$mol_book_placeholder()

			obj.title = () => this.title()

			return obj
		}
	}

	export class $mol_book_placeholder extends $mol_view {

		/**
		 * ```tree
		 * minimal_width 400
		 * ```
		 */
		minimal_width() {
			return 400
		}

		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	tabindex null
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				tabindex: null as any
			}
		}
	}

	export class $mol_book_page extends $mol_ghost {

		/**
		 * ```tree
		 * attr_static *
		 * 	^
		 * 	tabindex 0
		 * 	mol_book_page_visible true
		 * ```
		 */
		attr_static() {
			return {
				...super.attr_static(),
				tabindex: 0,
				mol_book_page_visible: true
			}
		}

		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	mol_book_page_focused <= focused
		 * 	mol_book_page_visible <= visible true
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				mol_book_page_focused: this.focused(),
				mol_book_page_visible: this.visible()
			}
		}

		/**
		 * ```tree
		 * visible true
		 * ```
		 */
		visible() {
			return true
		}
	}

}
