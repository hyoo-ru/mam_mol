namespace $ {
	export class $mol_select_list extends $mol_bar {

		/**
		 * ```tree
		 * value?val /string
		 * ```
		 */
		@ $mol_mem
		value(val?: any) {
			if ( val !== undefined ) return val
			return [

			] as readonly string[]
		}

		/**
		 * ```tree
		 * dictionary *
		 * ```
		 */
		dictionary() {
			return {

			}
		}

		/**
		 * ```tree
		 * Badge!key $mol_button_minor
		 * 	title <= option_title!key \badge
		 * 	click?event <=> remove!key?event null
		 * 	hint <= badge_hint @ \Drop
		 * 	enabled <= enabled true
		 * ```
		 */
		@ $mol_mem_key
		Badge(key: any) {
			const obj = new this.$.$mol_button_minor()

			obj.title = () => this.option_title(key)
			obj.click = (event?: any) => this.remove(key, event)
			obj.hint = () => this.badge_hint()
			obj.enabled = () => this.enabled()

			return obj
		}

		/**
		 * ```tree
		 * option_title!key \badge
		 * ```
		 */
		option_title(key: any) {
			return "badge"
		}

		/**
		 * ```tree
		 * remove!key?event null
		 * ```
		 */
		@ $mol_mem_key
		remove(key: any, event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * badge_hint @ \Drop
		 * ```
		 */
		badge_hint() {
			return this.$.$mol_locale.text( '$mol_select_list_badge_hint' )
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
		 * Pick $mol_select
		 * 	options <= options_pickable <= options /string
		 * 	value?val <=> pick?val \
		 * 	option_label!key <= option_title!key
		 * 	hint <= pick_hint @ \Add..
		 * ```
		 */
		@ $mol_mem
		Pick() {
			const obj = new this.$.$mol_select()

			obj.options = () => this.options_pickable()
			obj.value = (val?: any) => this.pick(val)
			obj.option_label = (key: any) => this.option_title(key)
			obj.hint = () => this.pick_hint()

			return obj
		}

		/**
		 * ```tree
		 * options_pickable <= options /string
		 * ```
		 */
		options_pickable() {
			return this.options()
		}

		/**
		 * ```tree
		 * options /string
		 * ```
		 */
		options() {
			return [

			] as readonly string[]
		}

		/**
		 * ```tree
		 * pick?val \
		 * ```
		 */
		@ $mol_mem
		pick(val?: any) {
			if ( val !== undefined ) return val
			return ""
		}

		/**
		 * ```tree
		 * pick_hint @ \Add..
		 * ```
		 */
		pick_hint() {
			return this.$.$mol_locale.text( '$mol_select_list_pick_hint' )
		}
	}

}
