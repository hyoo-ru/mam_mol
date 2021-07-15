namespace $ {
	export class $mol_select_list extends $mol_view {
		
		/**
		 * ```tree
		 * value?val /string
		 * ```
		 */
		@ $mol_mem
		value(val?: any) {
			if ( val !== undefined ) return val as never
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
		 * Badge!index $mol_button_minor
		 * 	title <= badge_title!index
		 * 	click?event <=> remove!index?event
		 * 	hint <= badge_hint
		 * 	enabled <= drop_enabled
		 * ```
		 */
		@ $mol_mem_key
		Badge(index: any) {
			const obj = new this.$.$mol_button_minor()
			
			obj.title = () => this.badge_title(index)
			obj.click = (event?: any) => this.remove(index, event)
			obj.hint = () => this.badge_hint()
			obj.enabled = () => this.drop_enabled()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Pick $mol_select
		 * 	options <= options_pickable
		 * 	value?val <=> pick?val
		 * 	option_label!key <= option_title!key
		 * 	trigger_enabled <= pick_enabled
		 * 	hint <= pick_hint
		 * 	Trigger_icon <= Pick_icon
		 * ```
		 */
		@ $mol_mem
		Pick() {
			const obj = new this.$.$mol_select()
			
			obj.options = () => this.options_pickable()
			obj.value = (val?: any) => this.pick(val)
			obj.option_label = (key: any) => this.option_title(key)
			obj.trigger_enabled = () => this.pick_enabled()
			obj.hint = () => this.pick_hint()
			obj.Trigger_icon = () => this.Pick_icon()
			
			return obj
		}
		
		/**
		 * ```tree
		 * badge_title!index \badge
		 * ```
		 */
		badge_title(index: any) {
			return "badge"
		}
		
		/**
		 * ```tree
		 * remove!index?event null
		 * ```
		 */
		@ $mol_mem_key
		remove(index: any, event?: any) {
			if ( event !== undefined ) return event as never
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
		 * drop_enabled <= enabled
		 * ```
		 */
		drop_enabled() {
			return this.enabled()
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
		 * options_pickable <= options
		 * ```
		 */
		options_pickable() {
			return this.options()
		}
		
		/**
		 * ```tree
		 * pick?val \
		 * ```
		 */
		@ $mol_mem
		pick(val?: any) {
			if ( val !== undefined ) return val as never
			return ""
		}
		
		/**
		 * ```tree
		 * option_title!key \
		 * ```
		 */
		option_title(key: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * pick_enabled <= enabled
		 * ```
		 */
		pick_enabled() {
			return this.enabled()
		}
		
		/**
		 * ```tree
		 * pick_hint @ \Add..
		 * ```
		 */
		pick_hint() {
			return this.$.$mol_locale.text( '$mol_select_list_pick_hint' )
		}
		
		/**
		 * ```tree
		 * Pick_icon $mol_icon_plus
		 * ```
		 */
		@ $mol_mem
		Pick_icon() {
			const obj = new this.$.$mol_icon_plus()
			
			return obj
		}
	}
	
}

