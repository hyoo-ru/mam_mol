namespace $ {
	export class $mol_number extends $mol_view {

		/**
		 * ```tree
		 * precision_view <= precision 1
		 * ```
		 */
		precision_view() {
			return this.precision()
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
		 * precision_change <= precision 1
		 * ```
		 */
		precision_change() {
			return this.precision()
		}

		/**
		 * ```tree
		 * value?val NaN
		 * ```
		 */
		@ $mol_mem
		value(val?: any) {
			if ( val !== undefined ) return val
			return NaN
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= String $mol_string
		 * 		type \number
		 * 		value?val <=> value_string?val \
		 * 		hint <= hint \
		 * 		enabled <= string_enabled <= enabled true
		 * 	<= Dec $mol_button_minor
		 * 		event_click?val <=> event_dec?val null
		 * 		enabled <= dec_enabled <= enabled true
		 * 		sub / <= dec_icon $mol_icon_minus
		 * 	<= Inc $mol_button_minor
		 * 		event_click?val <=> event_inc?val null
		 * 		enabled <= inc_enabled <= enabled true
		 * 		sub / <= inc_icon $mol_icon_plus
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
		 * String $mol_string
		 * 	type \number
		 * 	value?val <=> value_string?val \
		 * 	hint <= hint \
		 * 	enabled <= string_enabled <= enabled true
		 * ```
		 */
		@ $mol_mem
		String() {
			const obj = new this.$.$mol_string()

			obj.type = () => "number"
			obj.value = (val?: any) => this.value_string(val)
			obj.hint = () => this.hint()
			obj.enabled = () => this.string_enabled()

			return obj
		}

		/**
		 * ```tree
		 * value_string?val \
		 * ```
		 */
		@ $mol_mem
		value_string(val?: any) {
			if ( val !== undefined ) return val
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
		 * string_enabled <= enabled true
		 * ```
		 */
		string_enabled() {
			return this.enabled()
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
		 * Dec $mol_button_minor
		 * 	event_click?val <=> event_dec?val null
		 * 	enabled <= dec_enabled <= enabled true
		 * 	sub / <= dec_icon $mol_icon_minus
		 * ```
		 */
		@ $mol_mem
		Dec() {
			const obj = new this.$.$mol_button_minor()

			obj.event_click = (val?: any) => this.event_dec(val)
			obj.enabled = () => this.dec_enabled()
			obj.sub = () => [
				this.dec_icon()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * event_dec?val null
		 * ```
		 */
		@ $mol_mem
		event_dec(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * dec_enabled <= enabled true
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
		 * Inc $mol_button_minor
		 * 	event_click?val <=> event_inc?val null
		 * 	enabled <= inc_enabled <= enabled true
		 * 	sub / <= inc_icon $mol_icon_plus
		 * ```
		 */
		@ $mol_mem
		Inc() {
			const obj = new this.$.$mol_button_minor()

			obj.event_click = (val?: any) => this.event_inc(val)
			obj.enabled = () => this.inc_enabled()
			obj.sub = () => [
				this.inc_icon()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * event_inc?val null
		 * ```
		 */
		@ $mol_mem
		event_inc(val?: any) {
			if ( val !== undefined ) return val
			return null as any
		}

		/**
		 * ```tree
		 * inc_enabled <= enabled true
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
	}

}
