namespace $ {
	export class $mol_number extends $mol_view {
		
		/**
		 * ```tree
		 * precision_view <= precision
		 * ```
		 */
		precision_view() {
			return this.precision()
		}
		
		/**
		 * ```tree
		 * precision_change <= precision
		 * ```
		 */
		precision_change() {
			return this.precision()
		}
		
		/**
		 * ```tree
		 * value_min -Infinity
		 * ```
		 */
		value_min() {
			return -Infinity
		}
		
		/**
		 * ```tree
		 * value_max +Infinity
		 * ```
		 */
		value_max() {
			return +Infinity
		}
		
		/**
		 * ```tree
		 * value? +NaN
		 * ```
		 */
		@ $mol_mem
		value(next?: any) {
			if ( next !== undefined ) return next as never
			return +NaN
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
		 * sub /
		 * 	<= String
		 * 	<= Dec
		 * 	<= Inc
		 * ```
		 */
		sub() {
			return [
				this.String(),
				this.Dec(),
				this.Inc()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * precision 1
		 * ```
		 */
		precision() {
			return 1
		}
		
		/**
		 * ```tree
		 * type \tel
		 * ```
		 */
		type() {
			return "tel"
		}
		
		/**
		 * ```tree
		 * value_string? \
		 * ```
		 */
		@ $mol_mem
		value_string(next?: any) {
			if ( next !== undefined ) return next as never
			return ""
		}
		
		/**
		 * ```tree
		 * hint \
		 * ```
		 */
		hint() {
			return " "
		}
		
		/**
		 * ```tree
		 * string_enabled <= enabled
		 * ```
		 */
		string_enabled() {
			return this.enabled()
		}
		
		/**
		 * ```tree
		 * submit? null
		 * ```
		 */
		@ $mol_mem
		submit(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * String $mol_string
		 * 	type <= type
		 * 	value? <=> value_string?
		 * 	hint <= hint
		 * 	enabled <= string_enabled
		 * 	submit? <=> submit?
		 * ```
		 */
		@ $mol_mem
		String() {
			const obj = new this.$.$mol_string()
			
			obj.type = () => this.type()
			obj.value = (next?: any) => this.value_string(next)
			obj.hint = () => this.hint()
			obj.enabled = () => this.string_enabled()
			obj.submit = (next?: any) => this.submit(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * event_dec? null
		 * ```
		 */
		@ $mol_mem
		event_dec(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * dec_enabled <= enabled
		 * ```
		 */
		dec_enabled() {
			return this.enabled()
		}
		
		/**
		 * ```tree
		 * dec_icon $mol_icon_minus
		 * ```
		 */
		@ $mol_mem
		dec_icon() {
			const obj = new this.$.$mol_icon_minus()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Dec $mol_button_minor
		 * 	event_click? <=> event_dec?
		 * 	enabled <= dec_enabled
		 * 	sub / <= dec_icon
		 * ```
		 */
		@ $mol_mem
		Dec() {
			const obj = new this.$.$mol_button_minor()
			
			obj.event_click = (next?: any) => this.event_dec(next)
			obj.enabled = () => this.dec_enabled()
			obj.sub = () => [
				this.dec_icon()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * event_inc? null
		 * ```
		 */
		@ $mol_mem
		event_inc(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * inc_enabled <= enabled
		 * ```
		 */
		inc_enabled() {
			return this.enabled()
		}
		
		/**
		 * ```tree
		 * inc_icon $mol_icon_plus
		 * ```
		 */
		@ $mol_mem
		inc_icon() {
			const obj = new this.$.$mol_icon_plus()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Inc $mol_button_minor
		 * 	event_click? <=> event_inc?
		 * 	enabled <= inc_enabled
		 * 	sub / <= inc_icon
		 * ```
		 */
		@ $mol_mem
		Inc() {
			const obj = new this.$.$mol_button_minor()
			
			obj.event_click = (next?: any) => this.event_inc(next)
			obj.enabled = () => this.inc_enabled()
			obj.sub = () => [
				this.inc_icon()
			] as readonly any[]
			
			return obj
		}
	}
	
}

