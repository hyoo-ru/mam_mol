namespace $ {
	export class $mol_pick_time extends $mol_pick {
		
		/**
		 * ```tree
		 * Icon $mol_icon_clock_outline
		 * ```
		 */
		@ $mol_mem
		Icon() {
			const obj = new this.$.$mol_icon_clock_outline()
			
			return obj
		}
		
		/**
		 * ```tree
		 * trigger_enabled <= enabled
		 * ```
		 */
		trigger_enabled() {
			return this.enabled()
		}
		
		/**
		 * ```tree
		 * bubble_content /
		 * 	<= Input
		 * 	<= Pickers
		 * ```
		 */
		bubble_content() {
			return [
				this.Input(),
				this.Pickers()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * value_moment? $mol_time_moment
		 * ```
		 */
		@ $mol_mem
		value_moment(next?: any) {
			if ( next !== undefined ) return next as never
			const obj = new this.$.$mol_time_moment()
			
			return obj
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
		 * value? \
		 * ```
		 */
		@ $mol_mem
		value(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * Input $mol_format
		 * 	value? <=> value?
		 * 	mask \__:__
		 * 	allow \0123456789.
		 * 	enabled <= enabled
		 * ```
		 */
		@ $mol_mem
		Input() {
			const obj = new this.$.$mol_format()
			
			obj.value = (next?: any) => this.value(next)
			obj.mask = () => "__:__"
			obj.allow = () => "0123456789."
			obj.enabled = () => this.enabled()
			
			return obj
		}
		
		/**
		 * ```tree
		 * hour_selected? \
		 * ```
		 */
		@ $mol_mem
		hour_selected(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * hour_options *
		 * ```
		 */
		hour_options() {
			return {
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * Hours $mol_switch
		 * 	value? <=> hour_selected?
		 * 	options <= hour_options
		 * ```
		 */
		@ $mol_mem
		Hours() {
			const obj = new this.$.$mol_switch()
			
			obj.value = (next?: any) => this.hour_selected(next)
			obj.options = () => this.hour_options()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Delimiter $mol_paragraph title \:
		 * ```
		 */
		@ $mol_mem
		Delimiter() {
			const obj = new this.$.$mol_paragraph()
			
			obj.title = () => ":"
			
			return obj
		}
		
		/**
		 * ```tree
		 * minute_selected? \
		 * ```
		 */
		@ $mol_mem
		minute_selected(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * minute_options *
		 * ```
		 */
		minute_options() {
			return {
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * Minutes $mol_switch
		 * 	value? <=> minute_selected?
		 * 	options <= minute_options
		 * ```
		 */
		@ $mol_mem
		Minutes() {
			const obj = new this.$.$mol_switch()
			
			obj.value = (next?: any) => this.minute_selected(next)
			obj.options = () => this.minute_options()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Pickers $mol_row sub /
		 * 	<= Hours
		 * 	<= Delimiter
		 * 	<= Minutes
		 * ```
		 */
		@ $mol_mem
		Pickers() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Hours(),
				this.Delimiter(),
				this.Minutes()
			] as readonly any[]
			
			return obj
		}
	}
	
}

