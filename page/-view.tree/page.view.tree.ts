namespace $ {
	export class $mol_page extends $mol_view {

		/**
		 * ```tree
		 * sub /
		 * 	<= Head $mol_view sub <= head /
		 * 		<= Title $mol_button
		 * 			sub / <= title
		 * 			event_click?val <=> event_top?val null
		 * 		<= Tools $mol_view sub <= tools /$mol_view_content
		 * 	<= Body $mol_scroll
		 * 		scroll_top?val <=> body_scroll_top?val 0
		 * 		sub <= body /$mol_view_content
		 * 	<= Foot $mol_view sub <= foot /$mol_view
		 * ```
		 */
		sub() {
			return [
				this.Head(),
				this.Body(),
				this.Foot()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Head $mol_view sub <= head /
		 * 	<= Title $mol_button
		 * 		sub / <= title
		 * 		event_click?val <=> event_top?val null
		 * 	<= Tools $mol_view sub <= tools /$mol_view_content
		 * ```
		 */
		@ $mol_mem
		Head() {
			const obj = new this.$.$mol_view()

			obj.sub = () => this.head()

			return obj
		}

		/**
		 * ```tree
		 * head /
		 * 	<= Title $mol_button
		 * 		sub / <= title
		 * 		event_click?val <=> event_top?val null
		 * 	<= Tools $mol_view sub <= tools /$mol_view_content
		 * ```
		 */
		head() {
			return [
				this.Title(),
				this.Tools()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Title $mol_button
		 * 	sub / <= title
		 * 	event_click?val <=> event_top?val null
		 * ```
		 */
		@ $mol_mem
		Title() {
			const obj = new this.$.$mol_button()

			obj.sub = () => [
				this.title()
			] as readonly any[]
			obj.event_click = (val?: any) => this.event_top(val)

			return obj
		}

		/**
		 * ```tree
		 * event_top?val null
		 * ```
		 */
		@ $mol_mem
		event_top(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * Tools $mol_view sub <= tools /$mol_view_content
		 * ```
		 */
		@ $mol_mem
		Tools() {
			const obj = new this.$.$mol_view()

			obj.sub = () => this.tools()

			return obj
		}

		/**
		 * ```tree
		 * tools /$mol_view_content
		 * ```
		 */
		tools() {
			return [

			] as readonly $mol_view_content[]
		}

		/**
		 * ```tree
		 * Body $mol_scroll
		 * 	scroll_top?val <=> body_scroll_top?val 0
		 * 	sub <= body /$mol_view_content
		 * ```
		 */
		@ $mol_mem
		Body() {
			const obj = new this.$.$mol_scroll()

			obj.scroll_top = (val?: any) => this.body_scroll_top(val)
			obj.sub = () => this.body()

			return obj
		}

		/**
		 * ```tree
		 * body_scroll_top?val 0
		 * ```
		 */
		@ $mol_mem
		body_scroll_top(val?: any) {
			if ( val !== undefined ) return val
			return 0
		}

		/**
		 * ```tree
		 * body /$mol_view_content
		 * ```
		 */
		body() {
			return [

			] as readonly $mol_view_content[]
		}

		/**
		 * ```tree
		 * Foot $mol_view sub <= foot /$mol_view
		 * ```
		 */
		@ $mol_mem
		Foot() {
			const obj = new this.$.$mol_view()

			obj.sub = () => this.foot()

			return obj
		}

		/**
		 * ```tree
		 * foot /$mol_view
		 * ```
		 */
		foot() {
			return [

			] as readonly $mol_view[]
		}
	}

}
