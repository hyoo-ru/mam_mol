namespace $ {
	export class $mol_search extends $mol_bar {

		/**
		 * ```tree
		 * query?val \
		 * ```
		 */
		@ $mol_mem
		query(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * plugins / <= Hotkey
		 * ```
		 */
		plugins() {
			return [
				this.Hotkey()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Suggest
		 * 	<= Clear
		 * ```
		 */
		sub() {
			return [
				this.Suggest(),
				this.Clear()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * event_clear?val null
		 * ```
		 */
		@ $mol_mem
		event_clear(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * Hotkey $mol_hotkey key * escape?val <=> event_clear?val
		 * ```
		 */
		@ $mol_mem
		Hotkey() {
			const obj = new this.$.$mol_hotkey()

			obj.key = () => ({
				escape: (val?: any) => this.event_clear(val)
			})

			return obj
		}

		/**
		 * ```tree
		 * suggest_selected?val \
		 * ```
		 */
		@ $mol_mem
		suggest_selected(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * hint @ \Search...
		 * ```
		 */
		hint() {
			return this.$.$mol_locale.text( '$mol_search_hint' )
		}

		/**
		 * ```tree
		 * suggests_showed false
		 * ```
		 */
		suggests_showed() {
			return false
		}

		/**
		 * ```tree
		 * suggests /string
		 * ```
		 */
		suggests() {
			return [

			] as readonly string[]
		}

		/**
		 * ```tree
		 * submit?event null
		 * ```
		 */
		@ $mol_mem
		submit(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * Suggest $mol_select
		 * 	value?val <=> suggest_selected?val
		 * 	filter_pattern?val <=> suggest_selected?val
		 * 	hint <= hint
		 * 	filter_pattern?val <=> query?val
		 * 	options_showed <= suggests_showed
		 * 	options <= suggests
		 * 	Trigger_icon null
		 * 	submit?event <=> submit?event
		 * ```
		 */
		@ $mol_mem
		Suggest() {
			const obj = new this.$.$mol_select()

			obj.value = (val?: any) => this.suggest_selected(val)
			obj.filter_pattern = (val?: any) => this.suggest_selected(val)
			obj.hint = () => this.hint()
			obj.filter_pattern = (val?: any) => this.query(val)
			obj.options_showed = () => this.suggests_showed()
			obj.options = () => this.suggests()
			obj.Trigger_icon = () => null as any
			obj.submit = (event?: any) => this.submit(event)

			return obj
		}

		/**
		 * ```tree
		 * Clear_icon $mol_icon_cross
		 * ```
		 */
		@ $mol_mem
		Clear_icon() {
			const obj = new this.$.$mol_icon_cross()

			return obj
		}

		/**
		 * ```tree
		 * clear_hint @ \Clear
		 * ```
		 */
		clear_hint() {
			return this.$.$mol_locale.text( '$mol_search_clear_hint' )
		}

		/**
		 * ```tree
		 * Clear $mol_button_minor
		 * 	sub / <= Clear_icon
		 * 	event_click?val <=> event_clear?val
		 * 	hint <= clear_hint
		 * ```
		 */
		@ $mol_mem
		Clear() {
			const obj = new this.$.$mol_button_minor()

			obj.sub = () => [
				this.Clear_icon()
			] as readonly any[]
			obj.event_click = (val?: any) => this.event_clear(val)
			obj.hint = () => this.clear_hint()

			return obj
		}
	}

}
