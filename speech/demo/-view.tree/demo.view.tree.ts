namespace $ {
	export class $mol_speech_demo extends $mol_demo_small {

		/**
		 * ```tree
		 * sub /
		 * 	<= Toggle
		 * 	<= Message
		 * 	<= Speak
		 * ```
		 */
		sub() {
			return [
				this.Toggle(),
				this.Message(),
				this.Speak()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Toggle_icon $mol_icon_microphone
		 * ```
		 */
		@ $mol_mem
		Toggle_icon() {
			const obj = new this.$.$mol_icon_microphone()

			return obj
		}

		/**
		 * ```tree
		 * hearing?val false
		 * ```
		 */
		@ $mol_mem
		hearing(val?: any) {
			if ( val !== undefined ) return val
			return false
		}

		/**
		 * ```tree
		 * Toggle $mol_check_icon
		 * 	Icon <= Toggle_icon
		 * 	checked?val <=> hearing?val
		 * ```
		 */
		@ $mol_mem
		Toggle() {
			const obj = new this.$.$mol_check_icon()

			obj.Icon = () => this.Toggle_icon()
			obj.checked = (val?: any) => this.hearing(val)

			return obj
		}

		/**
		 * ```tree
		 * message \
		 * ```
		 */
		message() {
			return ""
		}

		/**
		 * ```tree
		 * Message $mol_view sub / <= message
		 * ```
		 */
		@ $mol_mem
		Message() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.message()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * speak?val false
		 * ```
		 */
		@ $mol_mem
		speak(val?: any) {
			if ( val !== undefined ) return val
			return false
		}

		/**
		 * ```tree
		 * Speak $mol_button_major
		 * 	click?val <=> speak?val
		 * 	sub / \Speak
		 * ```
		 */
		@ $mol_mem
		Speak() {
			const obj = new this.$.$mol_button_major()

			obj.click = (val?: any) => this.speak(val)
			obj.sub = () => [
				"Speak"
			] as readonly any[]

			return obj
		}
	}

}
