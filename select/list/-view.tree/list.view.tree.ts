namespace $ {
	export class $mol_select_list extends $mol_view {
		
		/**
		 * ```tree
		 * value? /string
		 * ```
		 */
		@ $mol_mem
		value(next?: any) {
			if ( next !== undefined ) return next as never
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
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * badges_list <= Badges
		 * ```
		 */
		badges_list() {
			return this.Badges()
		}
		
		/**
		 * ```tree
		 * Badge* $mol_button_minor
		 * 	title <= badge_title*
		 * 	click?event <=> remove*?event
		 * 	hint <= badge_hint
		 * 	enabled <= drop_enabled
		 * ```
		 */
		@ $mol_mem_key
		Badge(id: any) {
			const obj = new this.$.$mol_button_minor()
			
			obj.title = () => this.badge_title(id)
			obj.click = (event?: any) => this.remove(id, event)
			obj.hint = () => this.badge_hint()
			obj.enabled = () => this.drop_enabled()
			
			return obj
		}
		
		/**
		 * ```tree
		 * sub /$mol_view
		 * 	<= Pick
		 * 	^ badges_list
		 * ```
		 */
		sub() {
			return [
				this.Pick(),
				...this.badges_list()
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * Badges /$mol_view
		 * ```
		 */
		Badges() {
			return [
			] as readonly $mol_view[]
		}
		
		/**
		 * ```tree
		 * badge_title* \badge
		 * ```
		 */
		badge_title(id: any) {
			return "badge"
		}
		
		/**
		 * ```tree
		 * remove*?event null
		 * ```
		 */
		@ $mol_mem_key
		remove(id: any, event?: any) {
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
		 * align_hor \right
		 * ```
		 */
		align_hor() {
			return "right"
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
		 * pick? \
		 * ```
		 */
		@ $mol_mem
		pick(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * option_title* \
		 * ```
		 */
		option_title(id: any) {
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
		
		/**
		 * ```tree
		 * Pick $mol_select
		 * 	align_hor <= align_hor
		 * 	options <= options_pickable
		 * 	value? <=> pick?
		 * 	option_label* <= option_title*
		 * 	trigger_enabled <= pick_enabled
		 * 	hint <= pick_hint
		 * 	Trigger_icon <= Pick_icon
		 * ```
		 */
		@ $mol_mem
		Pick() {
			const obj = new this.$.$mol_select()
			
			obj.align_hor = () => this.align_hor()
			obj.options = () => this.options_pickable()
			obj.value = (next?: any) => this.pick(next)
			obj.option_label = (id: any) => this.option_title(id)
			obj.trigger_enabled = () => this.pick_enabled()
			obj.hint = () => this.pick_hint()
			obj.Trigger_icon = () => this.Pick_icon()
			
			return obj
		}
	}
	
}

