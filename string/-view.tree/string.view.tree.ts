namespace $ {
	export class $mol_string extends $mol_view {

		/**
		 * ```tree
		 * dom_name \input
		 * ```
		 */
		dom_name() {
			return "input"
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
		 * minimal_height 40
		 * ```
		 */
		minimal_height() {
			return 40
		}

		/**
		 * ```tree
		 * autocomplete false
		 * ```
		 */
		autocomplete() {
			return false
		}

		/**
		 * ```tree
		 * field *
		 * 	^
		 * 	disabled <= disabled false
		 * 	value <= value_changed?val <=> value?val \
		 * 	placeholder <= hint \
		 * 	type <= type?val \text
		 * 	spellcheck <= spellcheck false
		 * 	autocomplete <= autocomplete_native \
		 * ```
		 */
		field() {
			return {
				...super.field(),
				disabled: this.disabled(),
				value: this.value_changed(),
				placeholder: this.hint(),
				type: this.type(),
				spellcheck: this.spellcheck(),
				autocomplete: this.autocomplete_native()
			}
		}

		/**
		 * ```tree
		 * disabled false
		 * ```
		 */
		disabled() {
			return false
		}

		/**
		 * ```tree
		 * value_changed?val <=> value?val \
		 * ```
		 */
		value_changed(val?: any) {
			return this.value(val)
		}

		/**
		 * ```tree
		 * value?val \
		 * ```
		 */
		@ $mol_mem
		value(val?: any) {
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
		 * type?val \text
		 * ```
		 */
		@ $mol_mem
		type(val?: any) {
			if ( val !== undefined ) return val
			return "text"
		}

		/**
		 * ```tree
		 * spellcheck false
		 * ```
		 */
		spellcheck() {
			return false
		}

		/**
		 * ```tree
		 * autocomplete_native \
		 * ```
		 */
		autocomplete_native() {
			return ""
		}

		/**
		 * ```tree
		 * attr *
		 * 	^
		 * 	maxlength <= length_max Infinity
		 * ```
		 */
		attr() {
			return {
				...super.attr(),
				maxlength: this.length_max()
			}
		}

		/**
		 * ```tree
		 * length_max Infinity
		 * ```
		 */
		length_max() {
			return Infinity
		}

		/**
		 * ```tree
		 * event *
		 * 	^
		 * 	input?event <=> event_change?event null
		 * 	keydown?event <=> event_key_press?event null
		 * ```
		 */
		event() {
			return {
				...super.event(),
				input: (event?: any) => this.event_change(event),
				keydown: (event?: any) => this.event_key_press(event)
			}
		}

		/**
		 * ```tree
		 * event_change?event null
		 * ```
		 */
		@ $mol_mem
		event_change(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * event_key_press?event null
		 * ```
		 */
		@ $mol_mem
		event_key_press(event?: any) {
			if ( event !== undefined ) return event
			return null as any
		}

		/**
		 * ```tree
		 * plugins / <= Submit $mol_hotkey key * enter?event <=> submit?event null
		 * ```
		 */
		plugins() {
			return [
				this.Submit()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Submit $mol_hotkey key * enter?event <=> submit?event null
		 * ```
		 */
		@ $mol_mem
		Submit() {
			const obj = new this.$.$mol_hotkey()

			obj.key = () => ({
				enter: (event?: any) => this.submit(event)
			})

			return obj
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
	}

}
