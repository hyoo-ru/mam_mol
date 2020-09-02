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
		 * enabled true
		 * ```
		 */
		enabled() {
			return true
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
		 * String $mol_string
		 * 	type \number
		 * 	value?val <=> value_string?val
		 * 	hint <= hint
		 * 	enabled <= string_enabled
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
		 * 	event_click?val <=> event_dec?val
		 * 	enabled <= dec_enabled
		 * 	sub / <= dec_icon
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
		 * 	event_click?val <=> event_inc?val
		 * 	enabled <= inc_enabled
		 * 	sub / <= inc_icon
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
	}

}
